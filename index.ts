import {
  getTopLikedVideos,
  getNewestVideos,
  getTotalLikes,
  getTopViewedVideos,
} from "./src/calculations/calculations.ts";
import { Video } from "./src/models/Video.ts";
import getVideosMetadata from "./src/search/videoMetadata.ts";
import { VideoMetadataError } from "./src/errorHandle/errorTypes.ts";
import { handleVideoMetadataError } from "./src/errorHandle/switchErrors.ts";

async function main() {
  const stackbuildersVideoData: Video[] | VideoMetadataError =
    await getVideosMetadata();
  if ("type" in stackbuildersVideoData) {
    handleVideoMetadataError(stackbuildersVideoData);
  } else {
    const topLikedVideos = getTopLikedVideos(stackbuildersVideoData);
    const newestVideos = getNewestVideos(stackbuildersVideoData);
    const totalLikes = getTotalLikes(stackbuildersVideoData);
    const topViewedVideos = getTopViewedVideos(stackbuildersVideoData);

    console.log("Top 5 liked videos:", topLikedVideos);
    console.log("Top 5 newest videos:", newestVideos);
    console.log("Total likes:", totalLikes);
    console.log("Top 5 viewed videos:", topViewedVideos);
  }
}

main();
