const Student = require("../schema/ModelSchema");
const validation = require("../middleware/validator");
const docModel = require("../schema/docsSchema").docsModel;
const modelModel = require("../schema/ModelSchema").modelModel;
// import { body } from "express-validator";
const { body } = require("express-validator");

module.exports.getallModel = async (req, res) => {
  console.log("Res gell all user");
  res.send(await modelModel.find({}));
  // await Student.find()
};

module.exports.createModel = async (req, res) => {
  const name = req.body.name;
  const modelSchema = req.body.modelSchema;

  const doc = await modelModel.create({ name, modelSchema: modelSchema });
  await doc.save();
  res.send("Created Model Successfully");
};

module.exports.getModelByName = async (req, res) => {
  try {
    const modelName = req.params.name;
    const model = await modelModel.findOne({ name: modelName });
    if (!modelName) {
      res.sendStatus(404);
    }
    res.send(model);
  } catch {
    res.sendStatus(500);
  }
};

module.exports.updateSchemaByName = async (req, res) => {
  try {
    const modelschema = req.body.modelSchema;
    const modelName = req.params.name;
    const oldSchema = await modelModel.findOne({ name: modelName });
    if (Object.entries(oldSchema).length === 0) {
      res.send(`Model ${modelName}Dosen't exits..`);
    } else {
      const properties = Object.assign(
        oldSchema.modelSchema.properties,
        modelschema.properties
      );
      let required = oldSchema.modelSchema.required;
      console.log("Required: ", required);
      if (modelschema.required) {
        required = required.concat(modelschema.required);
      }
      await modelModel.findOneAndUpdate(
        { name: modelName },
        {
          $set: {
            "modelSchema.properties": properties,
            "modelSchema.required": required,
          },
        }
      );
      res.send("Updated SuccessFully");
    }
  } catch {
    console.log("here bad");
    res.sendStatus(400);
  }
};
module.exports.deleteModel = async (req, res) => {
  const modelId = req.params.modelId;
  await modelModel.findByIdAndDelete(modelId);
  await docModel.deleteMany({ model: modelId });
  res.send("Document Deleted Sucessfully");
};
