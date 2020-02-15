const sharp = require("sharp");
const fs=require("fs")
const userModel = require("../models/userModel");
module.exports.getUser = async function (req, res) {
  const { id } = req.body;
  const user = await userModel.findById(id);
  res.json({ user });
};
// update
module.exports.updateUser = async function (req, res) {
  const id = req.params.id;
  const img=await sharp(req.file.buffer).resize(600, 600).jpeg({
    quality: 60
  }).toFile("public/"+req.file.fieldname + '-' + Date.now() + ".jpeg")
  req.body.photo = req.file.fieldname + '-' + Date.now() + ".jpeg";
  const Imgfile=fs.createWriteStream(req.body.photo);
  img.pipe(Imgfile);
  const user = await userModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true
  });
  // console.log(user);
  // express => redirect
  res.redirect("/me");
  // const id = user.id;
};
