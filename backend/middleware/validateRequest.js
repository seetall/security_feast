export const validateRequest = (schema) => (req, res, next) => {
    try {
      schema.parse(req.body); // Validate the request body
      next(); // Proceed to the next middleware or controller
    } catch (error) {
      // Respond with the first validation error message
      res.status(400).json({
        success: false,
        message: error.errors[0].message,
      });
    }
  };
  