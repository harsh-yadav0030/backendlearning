// asyncHandler is a higher-order function (a function that takes another function as input)
const asyncHandler = (requestHandler) => {

  // It returns a new middleware function (req, res, next) → Express understands this
  return (req, res, next) => {

    // Wrap the requestHandler (your async route function) into a resolved Promise
    // This ensures both async and sync functions are handled uniformly
    Promise
      .resolve(requestHandler(req, res, next))

      // If any error occurs inside requestHandler (reject/throw),
      // catch it and pass it to Express error handling middleware
      .catch((err) => next(err));
  };
};

// Exporting so it can be used in routes
export { asyncHandler };