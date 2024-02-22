// Needed Resources
const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/");
const accController = require("../controllers/accountsController");
const accModel = require("../models/account-model");

// Route to build login view
router.get("/login", utilities.handleErrors(accController.buildLogin));

// Process the login request
router.post(
  "/login",
  // regValidate.loginRules(),
  // regValidate.checkLoginData,
  utilities.handleErrors(accController.accountLogin)
);

// Route to build registration
router.get("/register", utilities.handleErrors(accController.buildRegister));

router.post("/register", utilities.handleErrors(accController.registerAccount));

router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(accController.buildManagement)
);
module.exports = router;
