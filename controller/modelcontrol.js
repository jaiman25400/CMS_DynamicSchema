const Student = require("../schema/ModelSchema");
const validation = require("../middleware/validator");
const modelModel = require("../schema/ModelSchema").modelModel;
// import { body } from "express-validator";
const { body } = require("express-validator")

module.exports.getallModel = async (req, res) => {
  console.log('Res gell all user')
  return await modelModel.find({});
  // await Student.find()
};

module.exports.createModel = async (req, res) => {
  const name = req.body.name
  const modelSchema =req.body.modelSchema

  const doc = await modelModel.create({ name, modelSchema: modelSchema });
  await doc.save();
  res.send("Created Model Successfully")
};


