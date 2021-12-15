const express = require("express");
const router = express.Router();
const mediaController = require("../controller/mediaController");

router.get("/readAllMedia",mediaController.getAllMedia)
// Create a new Media For Specific Model
router.post("/createMedia", mediaController.addMediaData);

router.get("/view/:name",mediaController.getMediaByNameAndId)


module.exports = router;
