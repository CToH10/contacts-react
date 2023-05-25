import { z } from "zod";

export const searchSchema = z.object({
  name: z.string().nullish(),
});

export type SearchData = z.infer<typeof searchSchema>;
