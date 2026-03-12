const User = require("../Models/UserModel");
const { createSecretToken } = require("../Util/SecretToken.js");
const bcrypt = require("bcrypt");

module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const user = await User.create({ email, password, username });

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(201).json({
      success: true,
      message: "User signed up successfully",
      user,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error(error);
  }
};
