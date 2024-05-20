import {
  getTopLikedVideos,
  getNewestVideos,
  getTotalLikes,
  getTopViewedVideos,
} from "../src/calculations/calculations.ts";

import fixtureData from "./fixtures/youtubeData.ts";

describe("getTopLikedVideos", () => {
  describe("when receiving valid data", () => {
    it("returns an array with length 5", () => {
      const result = getTopLikedVideos(fixtureData);
      expect(result).toHaveLength(5);
    });

    it("returns an array with the top 5 videos with the most likes", () => {
      const result = getTopLikedVideos(fixtureData);

      const expectedVideoIds = [
        "wqFzBIHh_I4",
        "Zssas2Pop8k",
        "X0WwRoEfzRc",
        "lyOuWqp3r3U",
        "BUYGO5ksvoo",
      ];

      const returnedVideoIds = result.map((video) => video.videoId);

      expect(returnedVideoIds).toEqual(
        expect.arrayContaining(expectedVideoIds)
      );
    });
  });

  describe("when it receives an empty array", () => {
    it("returns an empty array", () => {
      const result = getTopLikedVideos([]);
      expect(result).toEqual([]);
    });
  });
});

describe("getNewestVideos", () => {
  describe("when receiving valid data", () => {
    it("returns an array with length 5", () => {
      const result = getNewestVideos(fixtureData);
      expect(result).toHaveLength(5);
    });

    it("returns an array with the newest videos", () => {
      const result = getNewestVideos(fixtureData);

      const expectedVideoIds = [
        "S9ZlUR9MrmM",
        "aRvpwr5ntKc",
        "9yeQ5JHluzg",
        "X0WwRoEfzRc",
        "wqFzBIHh_I4",
      ];

      const returnedVideoIds = result.map((video) => video.videoId);

      expect(returnedVideoIds).toEqual(
        expect.arrayContaining(expectedVideoIds)
      );
    });
  });

  describe("when it receives an empty array", () => {
    it("returns an empty array", () => {
      const result = getNewestVideos([]);
      expect(result).toEqual([]);
    });
  });
});

describe("getTotalLikes", () => {
  describe("when receiving valid data", () => {
    it("returns the total number of likes of all videos", () => {
      const result = getTotalLikes(fixtureData);
      const expectedTotalLikes = 56;
      expect(result).toBe(expectedTotalLikes);
    });
  });

  describe("when it receives an empty array", () => {
    it("returns 0", () => {
      const result = getTotalLikes([]);
      expect(result).toBe(0);
    });
  });
});

describe("getTopViewedVideos", () => {
  describe("when receiving valid data", () => {
    it("returns an array with length 5", () => {
      const result = getTopViewedVideos(fixtureData);
      expect(result).toHaveLength(5);
    });

    it("returns an array with the top viewed videos", () => {
      const result = getTopViewedVideos(fixtureData);

      const expectedVideoIds = [
        "aRvpwr5ntKc",
        "S9ZlUR9MrmM",
        "BUYGO5ksvoo",
        "lyOuWqp3r3U",
        "9yeQ5JHluzg",
      ];

      const returnedVideoIds = result.map((video) => video.videoId);

      expect(returnedVideoIds).toEqual(
        expect.arrayContaining(expectedVideoIds)
      );
    });
  });

  describe("when it receives an empty array", () => {
    it("returns an empty array", () => {
      const result = getTopViewedVideos([]);
      expect(result).toEqual([]);
    });
  });
});
