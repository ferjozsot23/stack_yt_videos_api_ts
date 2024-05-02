import client from "../api/client.ts";
import {
  CHANNEL_ID,
  MAX_RESULTS,
  PART,
  FIELDS,
  TYPE,
  VIDEO_DURATION,
} from "../utils/constants.ts";
import { ApiError, ParsingError } from "../errorHandle/errorTypes.ts";
import { getErrorMessage } from "../errorHandle/errorMessage.ts";
import { VideosIdSchema } from "../schema/VideosIdSchema.ts";

async function getVideosId(): Promise<string[]> {
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
      
      // Posible error parsing
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      const parsingError: ParsingError = {
        type: "parsing",
        message: `Error parsing video metadata with Zod:  ${errorMessage}`,
      };
      throw parsingError;
    }
    // Posible error fetching API
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err);
    const videosIdError: ApiError = {
      type: "network",
      message: `Error fetching videos from the API for the specified channel ID: ${errorMessage}`,
    };
    throw videosIdError;
  }
}

export default getVideosId;
