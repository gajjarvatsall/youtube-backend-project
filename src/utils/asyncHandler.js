// asyncHandler is a higher-order function that wraps asynchronous route handlers
// to catch errors and pass them to Express error handlers, avoiding repetitive try-catch blocks.
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    // Execute the requestHandler and catch any errors, forwarding them to next()
    Promise.resolve(requestHandler(req, res, next))
      .catch((err) => next(err));
  };
};

export { asyncHandler };
