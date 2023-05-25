import { z } from "zod";

export const editProfileSchema = z.object({
  fullName: z.string().nonempty(),
  email: z.string().email(),
  phone: z.string().nonempty(),
});

export type EditProfileData = z.infer<typeof editProfileSchema>;
export type EditContactData = z.infer<typeof editProfileSchema>;

// For now, editing password would be too strenuous. I'd have to find a way to compare the password with de DB, to ensure no accidental changes would be made. The API never provides the password, so comparing them would be difficult
