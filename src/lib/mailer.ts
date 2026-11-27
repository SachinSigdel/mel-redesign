import nodemailer from "nodemailer";
import type { ContactInput } from "@/lib/contactSchema";

/* Sends each contact-form enquiry to a Gmail inbox through Gmail's SMTP server.
   The credentials come from environment variables (.env.local locally, the project settings
   on Vercel), never from the code:
     GMAIL_USER          the Gmail address that sends the email
     GMAIL_APP_PASSWORD  a 16-character Google App Password (not your normal password)
     CONTACT_TO_EMAIL    optional: where enquiries go (defaults to GMAIL_USER)
     CONTACT_DRY_RUN=1   optional: validate but don't send (used by the tests) */

const ENQUIRY_LABELS: Record<string, string> = {
  candidate: "Candidate looking for work",
  employer: "Employer looking for staff",
  other: "Other enquiry",
};

// Addresses at the reserved example domains (RFC 2606) are test data and are never emailed
const isTestAddress = (email: string) => /@example\.(com|org|net)$/i.test(email);

export function mailIsConfigured() {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

export function shouldSend(data: ContactInput) {
  return mailIsConfigured() && process.env.CONTACT_DRY_RUN !== "1" && !isTestAddress(data.email);
}

// HTML-escape user input before it goes into the email body
const escape = (text: string) =>
  text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// No line breaks in a header, so a name can't add extra email headers
const oneLine = (text: string) => text.replace(/[\r\n]+/g, " ").trim();

export async function sendEnquiry(data: ContactInput) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  });

  const name = oneLine([data.firstName, data.lastName].filter(Boolean).join(" "));
  const type = ENQUIRY_LABELS[data.enquiryType] ?? data.enquiryType;
  const rows: [string, string][] = [
    ["Name", name],
    ["Email", data.email],
    ["Phone", data.phone || "Not given"],
    ["I am a", type],
  ];

  await transporter.sendMail({
    from: `"MEL website" <${process.env.GMAIL_USER}>`,
    to: process.env.CONTACT_TO_EMAIL || process.env.GMAIL_USER,
    replyTo: `"${name}" <${data.email}>`, // pressing Reply answers the person who wrote in
    subject: oneLine(`New enquiry from ${name} (${type})`),
    text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${data.message}`,
    html: `
      <table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
        ${rows.map(([k, v]) => `<tr><td style="color:#4a5372"><strong>${k}</strong></td><td>${escape(v)}</td></tr>`).join("")}
      </table>
      <p style="font-family:Arial,sans-serif;font-size:14px"><strong>Message</strong></p>
      <p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${escape(data.message)}</p>`,
  });
}
