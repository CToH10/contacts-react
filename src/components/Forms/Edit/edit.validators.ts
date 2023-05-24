import { z } from "zod";

export const editProfileSchema = z.object({
  fullName: z.string().nonempty(),
  email: z.string().email(),
  phone: z.string().nonempty(),
});

export type EditProfileData = z.infer<typeof editProfileSchema>;
export type EditContactData = z.infer<typeof editProfileSchema>;
