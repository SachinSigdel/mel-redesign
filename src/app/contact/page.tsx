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
      {/* on navy: the heading on the left, the four ways to reach MEL on the right */}
      <section className="on-dark bg-navy py-14 text-white md:pt-22 md:pb-20" data-cta-anchor>
        <div className="wrap grid items-center gap-8 md:grid-cols-[1fr_1.7fr] md:gap-14">
          <div className="animate-rise">
            <Eyebrow tone="soft-white">Get in touch</Eyebrow>
            <h1 className="mb-4 text-hero leading-[1.08] tracking-[-0.02em] text-white">Contact us</h1>
            <p className="max-w-120 text-18">
              Whether you&apos;re looking for your next role or need reliable staff, our team is here to help
            </p>
          </div>
          <ContactInfo />
        </div>
      </section>

      {/* on white: the intro and the map on the left, the form on the right */}
      <section className="py-16 md:py-24">
        <div className="wrap grid items-start gap-12 md:grid-cols-[1fr_1.15fr] md:gap-16">
          <div>
            <h2 className="mb-4 text-section">Talk to our team</h2>
            <p className="mb-8 max-w-120 text-17">
              Send us any enquiry, feedback or suggestion. You can also reach us directly using the details above.
            </p>
            <div className="overflow-hidden rounded-panel border border-hairline shadow-card">
              <iframe
                title="Map showing MEL Recruitment at Stockley Park, Uxbridge"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-120 w-full border-0"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9932.965882012477!2d-0.4369088!3d51.5087858!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xad7d30c070b7cb51%3A0x17a09de89512eb13!2sMEL%20Recruitment!5e0!3m2!1sen!2suk!4v1720174193154!5m2!1sen!2suk"
              />
            </div>
          </div>
          <div>
            <h2 className="mb-3 text-section">Send us a message</h2>
            <p className="mb-7 text-15">
              Fields marked <span className="text-error">*</span> are required
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
