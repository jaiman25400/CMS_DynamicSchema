const express = require("express");
const router = express.Router();
const validateController = require("../controller/validateController");


// Create a new Validation For Specific form
router.post("/createValidate", validateController.addvalidateData);

// Get a new Validation For Specific form
router.get("/readValidate/:Name", validateController.readValidateByFormName);



module.exports = router;