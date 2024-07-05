const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  console.log("validate tokena girdi...");
  let token;
  //header Authorization  || direct bearer TOken
  let authHeader = req.headers.Authorization || req.headers.authorization;
  console.log("authHeader = ", authHeader);
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    console.log("authHeaderdan tokeni aldi : ", token);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      console.log(decoded);
      if (err) {
        res.status(401);
        throw new Error("User is not authorized!");
      }
      req.user = decoded.user;
      req.access_token_send = token;
      next();
    });


    if (!token) {
      res.status(401);
      throw new Error("User is not authorizeed or token is missing!");
    }
}else{
      res.status(401);
      throw new Error("User is not authorizeed or token is missing!");

  }
});

module.exports = validateToken;
