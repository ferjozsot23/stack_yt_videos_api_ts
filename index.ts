import {
  getTopLikedVideos,
  getNewestVideos,
  getTotalLikes,
  getTopViewedVideos,
} from "./src/calculations/calculations.ts";
import getVideosMetadata from "./src/search/videoMetadata.ts";

async function main() {
  try {
    const stackbuildersVideoData = await getVideosMetadata();

    const topLikedVideos = getTopLikedVideos(stackbuildersVideoData);
    const newestVideos = getNewestVideos(stackbuildersVideoData);
    const totalLikes = getTotalLikes(stackbuildersVideoData);
    const topViewedVideos = getTopViewedVideos(stackbuildersVideoData);

    console.log("Top 5 liked videos:", topLikedVideos);
    console.log("Top 5 newest videos:", newestVideos);
    console.log("Total likes:", totalLikes);
    console.log("Top 5 viewed videos:", topViewedVideos);
  } catch (error) {
    console.error("Error retrieving videos metadata.", error);
  }
}

main();
