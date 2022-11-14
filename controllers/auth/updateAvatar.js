const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { RequestError } = require("../../helpers");
const { User } = require("../../models");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    throw RequestError(400, "Avatar is required");
  }
  const { _id: id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  try {
    const extension = originalname.split(".").pop();
    const newFileName = `${id}.${extension}`;
    const resultUpdate = path.join(avatarDir, newFileName);

    await Jimp.read(tempUpload)
      .then((avatar) => {
        return avatar.resize(250, 250).write(resultUpdate);
      })
      .catch((err) => {
        throw err;
      });

    const avatarURL = path.join("avatars", newFileName);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { avatarURL },
      { new: true }
    );
    res.status(200).json({
      avatarURL: updatedUser.avatarURL,
    });
  } catch (error) {
    next(error);
  } finally {
    await fs.unlink(tempUpload);
  }
};

module.exports = updateAvatar;
