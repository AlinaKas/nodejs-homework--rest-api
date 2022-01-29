const express = require("express");
const { TIME_REQUEST_LIMIT, REQUEST_LIMIT } = require("../../config/constants");
const {
  validation,
  controllerWrap,
  authenticate,
  limiter,
  upload,
} = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { joiUserSchema, joiSubscriptionSchema } = require("../../models/User");
const router = express.Router();

// Route /api/users/signup
router.post(
  "/signup",
  limiter(TIME_REQUEST_LIMIT, REQUEST_LIMIT),
  validation(joiUserSchema),
  controllerWrap(ctrl.signup)
);
router.post("/login", validation(joiUserSchema), controllerWrap(ctrl.login));
router.get("/logout", authenticate, controllerWrap(ctrl.logout));
router.get("/current", authenticate, controllerWrap(ctrl.current));

router.patch(
  "/",
  authenticate,
  validation(joiSubscriptionSchema),
  controllerWrap(ctrl.subscriptionUpdate)
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllerWrap(ctrl.uploadAvatar)
);

router.get("/verify/:verificationToken", controllerWrap(ctrl.verify));
router.post("/verify/", controllerWrap(ctrl.repeatVerify));

module.exports = router;
