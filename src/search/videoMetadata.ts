import getVideosId from "./videoId.ts"
import client from "../api/client.ts"
import { Video } from "../models/Video.ts"

import { VideoSchema } from "../schema/VideoSchema.ts"

async function getVideosMetadata(): Promise<Video[]> {
    const videosIdArray = await getVideosId()

    try {
        const response = await client.videos.list({
            part: ["snippet,statistics"],
            id: videosIdArray,
        })

        if (response.data.items) {
            const videosMetadata = response.data.items.map(
                ({ id, snippet, statistics }) => ({
                    videoId: id,
                    publishedAt: snippet?.publishedAt,
                    likeCount: statistics?.likeCount,
                    viewCount: statistics?.viewCount,
                })
            )
            const validatedVideos = videosMetadata.map((video) =>
                VideoSchema.parse(video)
            )
            return validatedVideos
        } else {
            return []
        }
    } catch (err) {
        throw new Error("Error fetching videos metadata: " + err.message)
    }
}

export default getVideosMetadata
