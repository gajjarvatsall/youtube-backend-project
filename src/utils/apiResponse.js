// Standard API response class for consistent response formatting
class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    // HTTP status code for the response
    this.statusCode = statusCode;
    // Data payload to return to the client
    this.data = data;
    // Message describing the response
    this.message = message;
    // Indicates if the request was successful (status code < 400)
    this.success = statusCode < 400;
  }
}

// Export the ApiResponse class for use in other modules
export { ApiResponse };
