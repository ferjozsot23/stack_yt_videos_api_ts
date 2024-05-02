import getVideosId from "./videoId.ts";
import client from "../api/client.ts";
import { Video } from "../models/Video.ts";
import { VideoSchema } from "../schema/VideoSchema.ts";
import { getErrorMessage } from "../errorHandle/errorMessage.ts";
import { ApiError, ParsingError } from "../errorHandle/errorTypes.ts";

async function getVideosMetadata(): Promise<Video[]> {
  try {
    const videosIdArray = await getVideosId();
    const response = await client.videos.list({
      part: ["snippet,statistics"],
      id: videosIdArray,
    });
    if (response.data.items) {
      const videosMetadata = response.data.items.map(
        ({ id, snippet, statistics }) => ({
          videoId: id,
          publishedAt: snippet?.publishedAt,
          likeCount: statistics?.likeCount,
          viewCount: statistics?.viewCount,
        })
      );
      try {
        const validatedVideos = videosMetadata.map((video) =>
          VideoSchema.parse(video)
        );
        return validatedVideos;
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        const parsingError: ParsingError = {
          type: "parsing",
          message: `Error parsing video metadata with Zod:  ${errorMessage}`,
        };
        throw parsingError;
      }
    } else {
      return [];
    }
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err);
    const metadataError: ApiError = {
      type: "network",
      message: `Error fetching metadata from the specified video IDs: ${errorMessage}`,
    };
    throw metadataError;
  }
}

export default getVideosMetadata;
