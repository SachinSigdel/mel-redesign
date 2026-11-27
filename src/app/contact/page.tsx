import type { Metadata } from "next";
import Eyebrow from "@/components/ui/Eyebrow";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Get in touch with MEL. Send us an enquiry, call 020 8064 0994 or email info@mymel.co.uk. Office hours Monday to Friday, 8am to 5pm.",
};

export default function ContactPage() {
  return (
    <>
      <section className="on-dark bg-navy py-14 text-white md:py-20">
        <div className="wrap animate-rise">
          <Eyebrow tone="soft-white" rule={false}>Get in touch</Eyebrow>
          <h1 className="mb-3 text-page text-white">Contact us</h1>
          <p className="max-w-xl text-18 text-white/85">
            Whether you&apos;re looking for your next role or need reliable staff, our team is here to help
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="wrap grid items-start gap-10 md:grid-cols-[1fr_1.25fr] md:gap-14">
          <ContactInfo />
          <div className="rounded-panel border border-hairline bg-white p-6 shadow-md sm:p-10">
            <h2 className="mb-2 text-24">Send us a message</h2>
            <p className="mb-6 text-15 text-muted">
              Fields marked <span className="text-error">*</span> are required
            </p>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24" aria-label="Map">
        <div className="wrap">
          <div className="overflow-hidden rounded-panel border border-hairline">
            <iframe
              title="Map showing MEL Recruitment at Stockley Park, Uxbridge"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-95 w-full border-0"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9932.965882012477!2d-0.4369088!3d51.5087858!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xad7d30c070b7cb51%3A0x17a09de89512eb13!2sMEL%20Recruitment!5e0!3m2!1sen!2suk!4v1720174193154!5m2!1sen!2suk"
            />
          </div>
        </div>
      </section>
    </>
  );
}
