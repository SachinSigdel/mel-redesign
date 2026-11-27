import { z } from "zod";

const UK_PHONE = /^(\+44|0)\d{9,10}$/;
const ENQUIRY_TYPES = ["candidate", "employer", "other"];

export const contactSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "Please enter your first name")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be 50 characters or fewer"),
  lastName: z.string().trim().max(50, "Last name must be 50 characters or fewer"),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address")
    .email("Please enter a valid email, like name@example.com"),
  phone: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || UK_PHONE.test(value.replace(/[\s()-]/g, "")),
      "Please enter a valid UK phone number, like 020 8064 0994",
    ),
  enquiryType: z.string().refine((value) => ENQUIRY_TYPES.includes(value), "Please tell us who you are"),
  message: z
    .string()
    .trim()
    .min(1, "Please enter a message")
    .min(10, "Your message must be at least 10 characters")
    .max(1000, "Your message must be 1000 characters or fewer"),
  company: z.string().optional(), // honeypot: real people leave it empty
});

export type ContactInput = z.infer<typeof contactSchema>;
