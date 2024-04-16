import client from "../api/client.js"
import {
    CHANNEL_ID,
    MAX_RESULTS,
    PART,
    FIELDS,
    TYPE,
    VIDEO_DURATION,
} from "../utils/constants.js"

async function getVideosId(): Promise<string[]> {
    try {
        const response = await client.search.list({
            part: PART,
            channelId: CHANNEL_ID,
            fields: FIELDS,
            maxResults: MAX_RESULTS,
            type: TYPE,
            videoDuration: VIDEO_DURATION,
        })
        return response.data.items
            ? (response.data.items
                  .map((item) => item.id?.videoId)
                  .filter((videoId) => typeof videoId === "string") as string[])
            : []
    } catch (err: any) {
        throw new Error("Error fetching videos from the API: " + err.message)
    }
}

export default getVideosId
