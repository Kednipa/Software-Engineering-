const express = require("express");
const router = express.Router();
const { calculatePrice } = require("../business_logic.js");
const db = require("../database_connection_service.js");

// Get reservations by guest ID
router.get("/reservation/guest/:guest_id", async (req, res) => {
  const { guest_id } = req.params;
  try {
    const result = await db.query(
      "SELECT * FROM public.reservation WHERE guest_id = $1",
      [guest_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.detail);
  }
});

// Add a new reservation
router.post("/reservation/new", async (req, res) => {
  try {
    const { fromdatetime, todatetime, property_id, guest_id } = req.body;
    const price = await calculatePrice(fromdatetime, todatetime, property_id);
    const result = await db.query(
      "INSERT INTO public.reservation (fromdatetime, todatetime, price, property_id, guest_id, reservation_id) VALUES ($1, $2, $3, $4, $5, COALESCE((SELECT max(reservation_id) FROM public.reservation), 0) + 1)",
      [fromdatetime, todatetime, price, property_id, guest_id]
    );
    res.json({ message: "Reservation added successfully", result });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.detail);
  }
});

module.exports = router;
