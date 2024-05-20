import client from "../api/client.ts";
import {
  CHANNEL_ID,
  MAX_RESULTS,
  PART,
  FIELDS,
  TYPE,
  VIDEO_DURATION,
} from "../utils/constants.ts";
import { VideoMetadataError } from "../errorHandle/errorTypes.ts";
import { VideosIdSchema } from "../schema/VideosIdSchema.ts";
import { toMetadataError, toParsingError } from "../errorHandle/errorReturn.ts";

async function getVideosId(): Promise<string[] | VideoMetadataError> {
  try {
    const response = await client.search.list({
      part: PART,
      channelId: CHANNEL_ID,
      fields: FIELDS,
      maxResults: MAX_RESULTS,
      type: TYPE,
      videoDuration: VIDEO_DURATION,
    });
    const videosIdArray = response.data.items
      ? response.data.items.map((item) => item.id?.videoId)
      : [];

    try {
      const validatedVideosId = videosIdArray.map((videoId) =>
        VideosIdSchema.parse(videoId)
      );
      return validatedVideosId;
    } catch (error: unknown) {
      return toParsingError(error);
    }
  } catch (error: unknown) {
    return toMetadataError(error);
  }
}

export default getVideosId;
