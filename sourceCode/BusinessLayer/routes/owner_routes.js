const express = require("express");
const router = express.Router();
const db = require("../database_connection_service.js");

// Get reservations for a property
router.post("/reservation/property", async (req, res) => {
  try {
    const { property_id } = req.body;
    const result = await db.query(
      "SELECT * FROM public.reservation WHERE property_id = $1",
      [property_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.detail);
  }
});

module.exports = router;
