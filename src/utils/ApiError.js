class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    // Call parent Error constructor (sets message)
    super(message);

    // HTTP status code (e.g., 400, 404, 500)
    this.statusCode = statusCode;

    // Custom message
    this.message = message;

    // Extra error details (validation errors, etc.)
    this.errors = errors;

    // Consistent API response fields
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