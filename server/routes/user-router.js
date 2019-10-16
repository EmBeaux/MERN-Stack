const express = require("express");

const UserController = require("../controllers/user-controller");

const router = express.Router();

router.post("/users", UserController.createUsers);
router.post("/signin", UserController.loginUser);

module.exports = router;
