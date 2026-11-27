import { expect, test } from "@playwright/test";

/* The server checks, called directly (as a bot would, skipping the form).
   They don't depend on the screen size, so they run once, on the desktop project. */
test.beforeEach(({}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "API checks run once");
});

const VALID = {
  firstName: "Jane",
  lastName: "",
  email: "jane.test@example.com", // example.com is never emailed
  phone: "",
  enquiryType: "candidate",
  message: "I am looking for warehouse work in Uxbridge.",
};
// Each test acts as a different made-up client address, so one test's rate limit can't affect another
const from = (ip: string) => ({ "x-forwarded-for": ip });

test("the server rejects invalid data, even when the browser checks are skipped", async ({ request }) => {
  const res = await request.post("/api/contact", {
    data: { ...VALID, email: "not-an-email", message: "hi" },
    headers: from("203.0.113.1"),
  });
  expect(res.status()).toBe(400);
  const { errors } = await res.json();
  expect(errors.map((e: { field: string }) => e.field)).toEqual(expect.arrayContaining(["email", "message"]));
});

test("a name with a line break is rejected (no email header tricks)", async ({ request }) => {
  const res = await request.post("/api/contact", {
    data: { ...VALID, firstName: "Jane\r\nBcc: someone@example.com" },
    headers: from("203.0.113.2"),
  });
  expect(res.status()).toBe(400);
  const { errors } = await res.json();
  expect(errors[0].field).toBe("firstName");
});

test("a filled-in honeypot is quietly accepted and ignored", async ({ request }) => {
  const res = await request.post("/api/contact", {
    data: { company: "Spam Ltd" }, // bots fill every field; the route answers ok without validating or sending
    headers: from("203.0.113.3"),
  });
  expect(res.status()).toBe(200);
  expect(await res.json()).toEqual({ ok: true });
});

test("posts from another website, or not sent as JSON, are refused", async ({ request }) => {
  const crossSite = await request.post("/api/contact", {
    data: VALID,
    headers: { ...from("203.0.113.4"), Origin: "https://another-site.example" },
  });
  expect(crossSite.status()).toBe(403);

  const notJson = await request.post("/api/contact", {
    data: JSON.stringify(VALID),
    headers: { ...from("203.0.113.4"), "Content-Type": "text/plain" },
  });
  expect(notJson.status()).toBe(415);
});

test("more than 5 enquiries in 10 minutes from one address are refused", async ({ request }) => {
  for (let i = 0; i < 5; i++) {
    const res = await request.post("/api/contact", { data: VALID, headers: from("203.0.113.5") });
    expect(res.status()).toBe(200);
  }
  const sixth = await request.post("/api/contact", { data: VALID, headers: from("203.0.113.5") });
  expect(sixth.status()).toBe(429);
  expect(sixth.headers()["retry-after"]).toBe("600");
});
