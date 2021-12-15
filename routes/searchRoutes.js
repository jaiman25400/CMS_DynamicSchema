const express = require("express");
const router = express.Router();
const searchController = require("../controller/searchController");


//Get Form With Name
router.post("/", searchController.getAllformByName)


module.exports = router;