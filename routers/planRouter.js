const express = require("express");
const planRouter = express.Router();
const multer = require("multer");
const {
  deletePlan,
  getAllPlans,
  getPlan,
  updatePlan,
  createPlan,
  checkInput,
  queryAdder,
  mymiddleware
} = require("../controllers/planController");
// api/plans => post
const { protectRoute, isAuthorized } = require("../controllers/authController");

var storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + ".jpeg")
  }, destination: function (req, file, cb) {
    cb(null, 'public');
  }
})

const fileFilter = function (req, file, cb) {
  try {
    if (file.mimetype.startsWith("image")) {
      cb(null, true)
    } else {
      // cb(null, false);
      cb(new Error("Wrong file format"))
    }
  }
  catch (err) {
    console.log(err);
  }
}
var upload = multer({
  storage: storage,
  fileFilter
})


planRouter
  .route("")
  .get(protectRoute, getAllPlans)
  .post(checkInput, isAuthorized(["admin","restaurant owner"]), createPlan);
planRouter.route("/best-5-plans").get(queryAdder, getAllPlans);

planRouter.post("/:id", upload.fields([{
  name: "cover", maxCount: 1
}, {
  name: "pictures", maxCount: 3
}]), updatePlan)

planRouter
  .route("/:id")
  .patch(updatePlan)
  .delete(deletePlan)
  .get(getPlan);
module.exports = planRouter;
