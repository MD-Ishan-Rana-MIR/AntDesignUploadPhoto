const express = require("express");
const upload = require("../middleware/upload");
const { register, allUser } = require("../controllers/authController");

const router = express.Router();

router.post(`/user-upload`,upload.single(`image`), register );
router.get(`/all-user`, allUser );



module.exports = router