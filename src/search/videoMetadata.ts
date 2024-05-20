import getVideosId from "./videoId.ts";
import client from "../api/client.ts";
import { Video } from "../models/Video.ts";
import { VideoSchema } from "../schema/VideoSchema.ts";
import { VideoMetadataError } from "../errorHandle/errorTypes.ts";
import { toMetadataError, toParsingError } from "../errorHandle/errorReturn.ts";
import { handleVideoMetadataError } from "../errorHandle/switchErrors.ts";

async function getVideosMetadata(): Promise<Video[] | VideoMetadataError> {
  const videosIdArray = await getVideosId();
  if ("type" in videosIdArray) {
    handleVideoMetadataError(videosIdArray);
    return videosIdArray;
  } else {
    try {
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
          return toParsingError(error);
        }
      } else {
        return [];
      }
    } catch (error: unknown) {
      return toMetadataError(error);
    }
  }
}

export default getVideosMetadata;
