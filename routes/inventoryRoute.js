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

// Route to make new inventory
router.get("/", utilities.handleErrors(invController.createNewThing));

// Add Classification Routes
router.get(
  "/add-classification",
  utilities.handleErrors(invController.addClassification)
);
router.post(
  "/add-classification",
  utilities.handleErrors(invController.registerClassification)
);

router.get(
  "/add-inventory",
  utilities.handleErrors(invController.addInventory)
);
router.post(
  "/add-inventory",
  utilities.handleErrors(invController.registerInventory)
);
module.exports = router;
