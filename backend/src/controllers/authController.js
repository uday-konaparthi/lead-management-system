const bcrypt = require("bcryptjs");
const User = require('../db/userSchema');
const generateToken = require("../middleware/generateToken");
const jwt = require('jsonwebtoken')

const handleRegister = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "All field are required" });
    }

    const existingUser = await User.findOne({ $or: [{ email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ first_name, last_name, email, password: hashedPassword });

    await user.save();
    const token = generateToken(user._id, user.email);

    res.cookie("token", token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "PRODUCTION", 
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    const userinfo = {
      _id: user._id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      updated_at: user.updated_at
    };

    console.log(userinfo)

    res.status(201).json({ message: "User registered successfully ", token, userinfo });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
}

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log({ email, password })

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: "User doesn't exist" });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = generateToken(user._id, user.email);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const userinfo = {
      _id: user._id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      createdAt: user.createdAt
    };

    res.status(200).json({
      message: "User logged in successfully",
      token,
      userinfo,
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

const handleLogout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  return res.status(200).json({ message: "Logged out successfully" });
};

const handleAutoLogin = async (req, res) => {
  const token = req.cookies.token || req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    return res.status(400).json({ message: "Invalid Token" });
  }

  const userId = decoded.id;

  const user = await User.findById(userId);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  const userinfo = {
      _id: user._id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      createdAt: user.createdAt
    };

  res.status(200).json({
    message: "User auto logged in successfully",
    token,
    userinfo,
  });
}

module.exports = { handleRegister, handleLogin, handleLogout, handleAutoLogin };