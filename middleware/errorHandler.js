const {constants} = require("../constants");
const errorHandler = (err, req, res, next) => {
  // res.send(err)
  const statusCode = res.statusCode ? res.statusCode : 500;
//   res.json({
//     title: "Validation Fail",
//     message: err.message,
//     stackTrace: err.stack,
//   });

console.log(req.method,req.hostname,statusCode);
  switch (statusCode) {
    case constants.SUCCESS_ERROR:
      res.status(404).json({
        title: "SUCCESS ERROR - STG WRONG",
        message: err.message,
        stackTrace: err.stack,
      });

      break;
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Fail",
        message: err.message,
        stackTrace: err.stack,
      });

      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });

      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });

      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Forbiden",
        message: err.message,
        stackTrace: err.stack,
      });

      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });

      break;

    default:
        console.log("No Error! All good!");
      break;
  }
};

module.exports = errorHandler;
