import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
});

export type LoginData = z.infer<typeof loginSchema>;
