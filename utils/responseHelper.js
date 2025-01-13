const successResponse = (res, message, data = {}) => {
    res.status(200).json({
      status: "success",
      message,
      data,
    });
  };
  
  const errorResponse = (res, message, statusCode = 400) => {
    res.status(statusCode).json({
      status: "error",
      message,
    });
  };
  
  module.exports = {
    successResponse,
    errorResponse,
  };
  