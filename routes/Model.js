const express = require("express");
const router = express.Router();

const StudC = require("../controller/modelcontrol");

router.get("/", StudC.getallModel);

router.post("/createModel", StudC.createModel);

//Get Specific Model
router.get("/readModel/:name", StudC.getModelByName);

//Update Model With Schema
router.put("/updateModel/:name", StudC.updateSchemaByName)

// router.delete("/:id", StudC.deleteModel);
// Delete Model From Database
router.delete("/deleteModel/:modelId", StudC.deleteModel)

module.exports = router;
