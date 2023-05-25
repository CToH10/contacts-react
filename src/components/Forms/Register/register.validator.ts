import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z.string().nonempty(),
    email: z.string().email(),
    phone: z.string().nonempty(),
    password: z
      .string()
      .min(8)
      .regex(
        /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        "Must contain at least one of: uppercase, lowercase, numeric value, special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type RegisterData = z.infer<typeof registerSchema>;

export type RegisterSubmission = Omit<RegisterData, "confirmPassword">;
