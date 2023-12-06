const express = require("express");
const router = express.Router();

const { getAllspecs, createspecs, getspecs, updatespecs, deletespecs } = require("../controllers/specs");

router.get("/", getAllspecs);
router.post("/createspecs", createspecs);
router.get("/:specsId", getspecs);
router.patch("/:specsId", updatespecs);
router.delete("/:specsId", deletespecs);

module.exports = router;
