// Needed Resources
const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/");
const invController = require("../controllers/invController");

// Route to build inventory by classification view
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
);

// Route to build inventory by id view
router.get(
  "/detail/:invId",
  utilities.handleErrors(invController.retrieveVehicleById)
);

// Route to see if part of the inventory exists by inventory id
router.get(
  "/type/:invId",
  utilities.handleErrors(invController.deleteByClassificationId)
);

// Route to delete part of inventory by inventory id
router.post(
  "/type/:invId",
  utilities.handleErrors(invController.deleteByClassificationId)
);

module.exports = router;
