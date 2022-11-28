const express = require("express");
const adminController = require("./../controllers/adminController");
const router = express.Router();

// All Routes of user
// These are handeled in controllers
router.get("/login", adminController.view);
router.post("/booking", adminController.login);
router.get("/booking/:id", adminController.booking);
router.post("/logout", adminController.logout);
router.post("/booking/accepted/:id/:bid", adminController.accept);
router.post("/booking/rejected/:id/:bid", adminController.reject);
router.get("/places/:id",adminController.places);
router.post("/places/add_place/:id", adminController.add_place);



module.exports = router;