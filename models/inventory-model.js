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
    console.error("getclassificationsbyid error " + error);
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
    console.error("getclassificationsbyid error " + error);
  }
}

// who knew that exporting your functions generally leads to code functioning?
// not me, because I forgot!
module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  retrieveVehicleById,
};
