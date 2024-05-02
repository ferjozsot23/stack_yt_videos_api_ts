type ApiError = {
  type: "network";
  message: string;
};

type ParsingError = {
  type: "parsing";
  message: string;
};


export { ApiError, ParsingError };
