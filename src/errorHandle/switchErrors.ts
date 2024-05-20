import { VideoMetadataError } from "../errorHandle/errorTypes";

export function handleVideoMetadataError(error: VideoMetadataError): void {
    switch (error.type) {
      case "network":
        console.error("Network error occurred:", error.message);
        break;
      case "parsing":
        console.error("Parsing error occurred:", error.message);
        break;
      default:
        console.error("Unexpected error occurred:", error);
        break;
    }
  }

  