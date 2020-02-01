const userRouter = require("express").Router();
const multer = require("multer");
const path=require("path");
// server => upload path

// var upload = multer({});
console.log(__dirname);
var storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+".jpeg")
  },destination:function(req,file,cb){
    cb(null, 'uploads');
  }
})

var upload = multer({
  storage: storage,
})
const {
  signup,
  login,
  forgetPassword,
  resetPassword,
  protectRoute
} = require("../controllers/authController");
const { getUser, updateUser } = require("../controllers/userController");
// req.body=> photo=>req.file=> changes
userRouter
  .route("/updateUser/:id")
  .post(protectRoute, upload.single("photo"), updateUser);
userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
userRouter.route("/getUser").get(getUser);
userRouter.route("/forgetPassword").patch(forgetPassword);
userRouter.route("/resetPassword").patch(resetPassword);


// userRouter.route("/updatePassword").patch(updatePassword);
module.exports = userRouter;
