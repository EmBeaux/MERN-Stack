const express = require("express");

const UserController = require("../controllers/user-controller");

const router = express.Router();

router.post("/users", UserController.createUsers);
router.delete("/login", UserController.loginUser);

module.exports = router;
