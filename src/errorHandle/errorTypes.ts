type ApiError = {
  type: "network";
  message: string;
};

type ParsingError = {
  type: "parsing";
  message: string;
};

type VideoMetadataError = ApiError | ParsingError

export { ApiError, ParsingError, VideoMetadataError };
