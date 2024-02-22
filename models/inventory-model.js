const pool = require("../database/");

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications() {
  return await pool.query(
    "SELECT * FROM public.classification ORDER BY classification_name"
  );
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
        JOIN public.classification AS c  
        ON i.classification_id = c.classification_id 
        WHERE i.classification_id = $1`,
      [classification_id]
    );
    return data.rows;
  } catch (error) {
    console.error("getclassificationsbyid " + error);
  }
}

/* ***************************
 *  Get vehicle data from inventory id
 * ************************** */
async function retrieveVehicleById(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory where inv_id = $1`,
      [inv_id]
    );
    return data.rows;
  } catch (error) {
    console.error("VehicleById error " + error);
  }
}

/* *****************************
 *   Register new classification
 * *************************** */
async function registerClassification(classification_name) {
  try {
    const sql =
      "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *";
    return await pool.query(sql, [classification_name]);
  } catch (error) {
    return error.message;
  }
}

/* *****************************
 *   Register new inventory
 * *************************** */
async function registerinventory(
  inv_make,
  inv_model,
  inv_description,
  inv_image = "/images/vehicles/no-image.png",
  inv_thumbnail = "/images/vehicles/no-image-tn.png",
  inv_price,
  inv_year,
  inv_miles,
  inv_color,
  classification_id = "41"
) {
  try {
    const sql =
      "INSERT INTO public.inventory (inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color, classification_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
    return await pool.query(sql, [
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
      classification_id,
    ]);
  } catch (error) {
    return error.message;
  }
}

// who knew that exporting your functions generally leads to code functioning?
// not me, because I forgot!
module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  retrieveVehicleById,
  registerClassification,
  registerinventory,
};
