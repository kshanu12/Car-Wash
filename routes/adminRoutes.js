const express = require("express");
const adminController = require("./../controllers/adminController");
const router = express.Router();

// All Routes of user
// These are handeled in controllers
router.get("/login", adminController.view);
router.post("/booking", adminController.login);
router.post("/logout", adminController.logout);
// router.get("/sign_up/about_u_login", userController.ulhelp);
// router.post("/sign_up", userController.post);
// router.post("/delete/:id", userController.deleteUser);       //You can use router.delete() but here through html forms you only can send GET or POST method (So handle delete using in any one of them , here using post)
// router.get("/update/:id",userController.redirectUpdatePage);
// router.post("/update/:id",userController.updateUser);
// router.post("/search",userController.searchUser);


module.exports = router;