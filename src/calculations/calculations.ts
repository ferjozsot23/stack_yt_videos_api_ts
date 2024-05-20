import { Video } from "../models/Video.ts";

const getTopLikedVideos = (data: Video[]): Video[] =>
  data
    .sort((videoA: Video, videoB: Video) => videoB.likeCount - videoA.likeCount)
    .slice(0, 5);

const getNewestVideos = (data: Video[]): Video[] =>
  data
    .sort(
      (videoA: Video, videoB: Video) =>
        new Date(videoB.publishedAt).getTime() -
        new Date(videoA.publishedAt).getTime()
    )
    .slice(0, 5);

const getTotalLikes = (data: Video[]): number =>
  data.reduce((total: number, video: Video) => total + video.likeCount, 0);

const getTopViewedVideos = (data: Video[]): Video[] =>
  data
    .sort((videoA, videoB) => videoB.viewCount - videoA.viewCount)
    .slice(0, 5);

export {
  getTopLikedVideos,
  getNewestVideos,
  getTotalLikes,
  getTopViewedVideos,
};
