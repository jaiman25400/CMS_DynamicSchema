const express = require("express");
const router = express.Router();
const docController = require("../controller/docController");
const validation = require("../middleware/validator");


// Get All Docs Of Specific Model
router.get("/readDoc/:modelName", docController.getDocByModelName);

// Create a new Docs For Specific Model
router.post("/createDoc/:modelName", docController.addData);

// Update Docs Of Specific Model
router.put("/updateDoc/:modelName/:docId", docController.updateData)

// Delete Docs From Database
router.delete("/deleteDoc/:docId", docController.deleteData)

module.exports = router;
