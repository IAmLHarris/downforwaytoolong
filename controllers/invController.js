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
  const inv_id = req.params.invId;
  const data = await invModel.retrieveVehicleById(inv_id);
  const showcase = await utilities.buildInventoryShowcase(data);
  let nav = await utilities.getNav();

  res.render("./inventory/showcase", {
    title: "vehicle",

    nav,
    showcase,
  });
};

//makes management view
invCont.createNewThing = async function (req, res, next) {
  let nav = await utilities.getNav();
  const classificationSelect = await utilities.buildClassificationGrid();
  res.render("./inventory/management", {
    title: "Management",

    nav,
  });
};

invCont.addClassification = async function (req, res, next) {
  let nav = await utilities.getNav();

  res.render("./inventory/add-classification", {
    title: "Add Classification",

    nav,
  });
};

/* ****************************************
 *  Process Classification Registration
 * *************************************** */
invCont.registerClassification = async function (req, res) {
  let nav = await utilities.getNav();
  const { classification_name } = req.body;

  const regResult = await invModel.registerClassification(classification_name);

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'ve registered ${classification_name}.`
    );
    res.status(201).render("./inventory/add-classification", {
      title: "Registration",
      nav,
    });
  } else {
    req.flash("notice", "Sorry, the registration failed.");
    res.status(501).render("./inventory/add-classification", {
      title: "Registration",
      nav,
    });
  }
};

invCont.addInventory = async function (req, res, next) {
  let nav = await utilities.getNav();

  let newthing = await utilities.giveClassifId();

  res.render("./inventory/add-inventory", {
    title: "Add Inventory",
    newthing,
    nav,
  });
};

/* ****************************************
 *  Process inventory Registration
 * *************************************** */
invCont.registerinventory = async function (req, res) {
  let nav = await utilities.getNav();
  const { inv_make } = req.body;

  const regResult = await invModel.registerinventory(inv_make);

  if (regResult) {
    req.flash("notice", `Congratulations, you\'ve registered ${inv_make}.`);
    res.status(201).render("./inventory/add-inventory", {
      title: "Registration",
      nav,
    });
  } else {
    req.flash("notice", "Sorry, the registration failed.");
    res.status(501).render("./inventory/add-inventory", {
      title: "Registration",
      nav,
    });
  }
};

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id);
  const invData = await invModel.getInventoryByClassificationId(
    classification_id
  );
  if (invData[0].inv_id) {
    return res.json(invData);
  } else {
    next(new Error("No data returned"));
  }
};

module.exports = invCont;
