const express = require("express");
const upload = require("../middleware/upload");
const { register } = require("../controllers/authController");

const router = express.Router();

router.post(`/user-upload`,upload.single(`image`), register );



module.exports = router