const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register a user
//@route POST /api/users/register
//@access private
//! REGISTER ---###########################################
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvaliable = await User.findOne({ email });
  if (userAvaliable) {
    res.status(400);
    throw new Error("User alreade registered!");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("HashedPassword", hashedPassword);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log("User created : ", newUser);
  if (newUser) {
    res.status(201).json({
      newUser,
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

//@desc Login a user
//@route POST /api/users/login
//@access private
//! LOGIN ---###########################################
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const user = await User.findOne({ email });

  //compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn:"15m"}
    );
    res.status(200).json(accessToken);
  }else{
    res.status(401);
    throw new Error("email or password is not valid")
  }

  res.json({ message: "Login the user" });
});

//@desc Get current user
//@route GET /api/users/current
//@access private
//! CURRENT ---###########################################
const currentUser = asyncHandler(async (req, res) => {
  res.json({ accessToken: req.access_token_send,user:req.user });
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
