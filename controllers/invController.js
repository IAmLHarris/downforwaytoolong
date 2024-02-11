const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
};

/* ***************************
 *  Build inventory by id view
 * ************************** */
invCont.retrieveVehicleById = async function (req, res, next) {
  const vehicle_id = req.params.vehicleId;
  const data = await invModel.retrieveVehicleById(vehicle_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();

  res.render("./inventory/classification", {
    title: "vehicles",
    nav,
    grid,
  });
};

module.exports = invCont;
