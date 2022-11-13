const express = require("express");

const { validateBody, authenticate, upload } = require("../../middleware");

const { ctrlWrapper } = require("../../helpers");

const { schemas } = require("../../models/user");

const { auth: ctrl } = require("../../controllers");

const router = express.Router();

router.post(
  "/signup",
  validateBody(schemas.signupSchema),
  ctrlWrapper(ctrl.signup)
);

router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);
module.exports = router;
