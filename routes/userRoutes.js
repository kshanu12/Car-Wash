const express = require("express");
const userController = require("./../controllers/userController");
const router = express.Router();

// All Routes of user
// These are handeled in controllers
router.get("/login", userController.login);
router.post("/login", userController.signin);
router.get("/booking/:id", userController.booking);
router.get("/sign_up",userController.sign_up);
router.post("/sign_up",userController.register);
router.post("/logout", userController.logout);
router.get("/add_booking/:id", userController.render_add_booking);  // render user_app_booking page
router.post("/add_booking/:id", userController.add_booking);  // render user_app_booking page



// router.get("/sign_up/about_u_login", userController.ulhelp);
// router.post("/sign_up", userController.post);
// router.post("/delete/:id", userController.deleteUser);       //You can use router.delete() but here through html forms you only can send GET or POST method (So handle delete using in any one of them , here using post)
// router.get("/update/:id",userController.redirectUpdatePage);
// router.post("/update/:id",userController.updateUser);
// router.post("/search",userController.searchUser);


module.exports = router;