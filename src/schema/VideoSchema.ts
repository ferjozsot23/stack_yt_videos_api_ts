import { z } from "zod"

export const VideoSchema = z.object({
    videoId: z.string().default(""),
    publishedAt: z.string().default(""),
    likeCount: z.number().default(0),
    viewCount: z.number().default(0),
})
