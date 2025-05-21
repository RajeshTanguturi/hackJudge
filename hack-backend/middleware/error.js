// middleware/error.js
// Global error handler
module.exports = (err, req, res, next) => {
    console.error(err.stack);
    
    // If response is already being sent, forward to Express default error handler
    if (res.headersSent) {
      return next(err);
    }
  
    // Handle specific error types
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    
    // Default to 500 server error
    res.status(500).json({
      message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message
    });
  };