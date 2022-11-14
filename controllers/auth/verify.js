const { User } = require("../../models");

const { RequestError } = require("../../helpers");

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw RequestError(404);
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({ message: "Email verify success" });
};

module.exports = verify;
