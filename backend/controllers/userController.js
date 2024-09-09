const User = require("../models/user");
const jwt = require("../utils/jwt");

exports.registerUser = async (req, res) => {
    try {      
    const { userName, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ userName, email, password });

    res.status(201).json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      token: jwt.generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        token: jwt.generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
