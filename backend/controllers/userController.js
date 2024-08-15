const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  const token = jwt.sign(user, process.env.JWT_SECRET, { algorithm: "HS256" });
  return token;
}

const userController = {
  async userRegister(req, res, next) {
    try {
      const { username, password } = req.body;
      const dupeUser = await User.findOne({ username });
      if (dupeUser) {
        return res.status(409).json("duplicate");
      }
      const user = await User.create({ username, password });
      const jwtToken = generateAccessToken({ id: user._id });

      if (user) {
        res.locals.data = { user, jwtToken };
        next();
      } else {
        res.status(404);
      }
    } catch (err) {
      return next({
        log: `userController error from userRegister ${err}`,
        status: 500,
        message: { err: "An error occurred while registering user" },
      });
    }
  },

  async userLogin(req, res, next) {
    console.log('login hit, controller')
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404);
      }
      const isMatch = await user.matchPassword(password, user.password);
      if (!isMatch) {
        return res.status(401).json("wrong password");
      }
      const jwtToken = generateAccessToken({ id: user._id });
      res.locals.data = { user, jwtToken };
      next();
    } catch (err) {
      return next({
        log: `userController error from userRegister ${err}`,
        status: 500,
        message: { err: "An error occurred while registering user" },
      });
    }
  },
};

module.exports = userController;
