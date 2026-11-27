/* A small in-memory rate limit for the contact form: at most LIMIT enquiries per WINDOW_MS from one IP.
   Honest limit: on Vercel each server instance keeps its own count and loses it when it's recycled,
   so this slows a flood from one source but isn't a hard cap. A shared store (for example Upstash
   Redis) or a Vercel firewall rule would make it one. */
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const LIMIT = 5;

const hits = new Map<string, number[]>(); // ip → times of its recent requests

export function isRateLimited(key: string, now = Date.now()) {
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  const limited = recent.length >= LIMIT;
  if (!limited) recent.push(now);
  hits.set(key, recent);

  // keep the map small: drop addresses with nothing recent
  if (hits.size > 5000) {
    for (const [ip, times] of hits) if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(ip);
  }
  return limited;
}

// On Vercel, x-forwarded-for is set by Vercel itself (a client can't fake it there)
export function clientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown"
  );
}
