const db = require("./database_connection_service.js");

async function verifyLogin(contact, password) {
  const result = await db.query(
    "SELECT * FROM public.generaluser WHERE contactinformation = $1 AND password = $2",
    [contact, password]
  );
  if (result.rows.length > 0) {
    return result.rows[0];
  } else {
    return null;
  }
}

async function calculatePrice(fromdatetime, todatetime, property_id) {
  const result = await db.query(
    "SELECT dailyrate FROM public.property WHERE property_id = $1",
    [property_id]
  );
  let date1 = new Date(fromdatetime);
  let date2 = new Date(todatetime);
  let difference_In_Time = date2.getTime() - date1.getTime();
  let difference_In_Days = Math.round(difference_In_Time / (1000 * 3600 * 24));
  return difference_In_Days * result.rows[0].dailyrate;
}

module.exports = {
  verifyLogin,
  calculatePrice,
};
