const viewRouter = require("express").Router();
const {
  getHomePage,
  getPlansPage,
  getLoginPage,
  getProfilePage
} = require("../controllers/viewController");
const {
  protectRoute,
  isUserVerified,
  logout
} = require("../controllers/authController");
viewRouter.use(isUserVerified);
viewRouter.route("/logout").get(logout);
viewRouter.route("/plans").get(protectRoute, getPlansPage);
viewRouter.route("/me").get(protectRoute, getProfilePage);
viewRouter.route("/login").get(getLoginPage);
viewRouter.route("").get(getHomePage);

module.exports = viewRouter;
