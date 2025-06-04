// Custom error class for API error handling
class ApiError extends Error {
  constructor(
    statusCode, // HTTP status code for the error
    message = "Something went wrong", // Error message
    errors = [], // Array of additional error details
    stack = "" // Optional stack trace
  ) {
    super(message);
    // HTTP status code
    this.statusCode = statusCode;
    // Optional data property (set to null by default)
    this.data = null;
    // Error message
    this.message = message;
    // Indicates the request was not successful
    this.success = false;
    // Additional error details
    this.errors = errors;

    // Set the stack trace if provided, otherwise capture it
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Export the ApiError class for use in other modules
export { ApiError };
