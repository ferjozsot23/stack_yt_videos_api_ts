import { z } from "zod";

export const VideoSchema = z.object({
  videoId: z.string().default(""),
  publishedAt: z.string().default(""),
  likeCount: z.string().transform((value) => parseInt(value, 10)),
  viewCount: z.string().transform((value) => parseInt(value, 10)),
});
