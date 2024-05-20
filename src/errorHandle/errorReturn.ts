import { ApiError, ParsingError } from "./errorTypes";
import { getErrorMessage } from "./errorMessage";

const toParsingError = (error: unknown) => {
  const errorMessage = getErrorMessage(error);
  const parsingError: ParsingError = {
    type: "parsing",
    message: `Error parsing video metadata with Zod:  ${errorMessage}`,
  };
  return parsingError;
};

const toMetadataError = (error: unknown) => {
  const errorMessage = getErrorMessage(error);
  const metadataError: ApiError = {
    type: "network",
    message: `Error fetching metadata from the specified video IDs: ${errorMessage}`,
  };
  return metadataError;
};

export { toParsingError, toMetadataError };
