const express = require("express");
const router = express.Router();

const StudC = require("../controller/modelcontrol");

router.get("/", StudC.getallModel);

router.post("/createModel", StudC.createModel);

// router.put("/:id", StudC.updateModel);

// router.delete("/:id", StudC.deleteModel);

module.exports = router;
