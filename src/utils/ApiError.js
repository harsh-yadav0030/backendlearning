class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    // Call parent Error constructor (sets message)
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.success = false;   // indicates failure
    this.data = null;       // no data in error response

    // Optional custom stack trace
    if (stack) {
      this.stack = stack;
    } else {
      // Capture stack trace excluding constructor call
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };