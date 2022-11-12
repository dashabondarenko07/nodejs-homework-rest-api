const bcrypt = require("bcryptjs");

const { User } = require("../../models");

const { RequestError } = require("../../helpers");

const signup = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ password: hashPassword, email });
  res.status(201).json({
    email: result.email,
  });
};

module.exports = signup;
