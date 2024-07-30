module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  console.log(err.message);
  console.log("=================");

  if (err.code === 11000) {
    err.message = `${Object.keys(err.keyValue)} is already register`;
    err.statusCode = 400;
  }

  res.status(err.statusCode).json({ success: false, message: err.message });
};
