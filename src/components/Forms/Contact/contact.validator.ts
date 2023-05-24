import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string(),
});

export type ContactData = z.infer<typeof contactSchema>;
