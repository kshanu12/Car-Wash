const express = require("express");
const userController = require("./../controllers/userController");
const router = express.Router();

// All Routes of user
// These are handeled in controllers
router.get("/login", userController.login);
router.post("/login", userController.signin);
router.get("/booking/:id", userController.booking);
router.get("/sign_up", userController.sign_up);
router.post("/sign_up", userController.register);
router.post("/logout", userController.logout);
router.get("/add_booking/:id", userController.render_add_booking);  // render user_app_booking page
router.post("/add_booking/:id", userController.add_booking);
router.post("/add_booking/check_availability/:id", userController.check_availability);


module.exports = router;