const express = require("express");
const db = require("../database_connection_service.js");
const router = express.Router();

// Get cleaning appointments for a specific cleaning staff
router.get("/cleaningappointments/:cleaningStaff_id", async (req, res) => {
  try {
    const { cleaningStaff_id } = req.params;
    const result = await db.query(
      `SELECT ca.cleaning_appointment_id as id, ca.price, ca.property_id, 
              p.name as propertyTitle, p.address as propertyAddress 
       FROM public.cleaningappointment ca 
       JOIN public.property p ON ca.property_id = p.property_id 
       WHERE ca.cleaningStaff_id = $1 AND ca.status = 'Pending'`,
      [cleaningStaff_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.detail);
  }
});

// Mark a cleaning appointment as done
router.patch("/cleaningappointments/done/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query(
      "UPDATE public.cleaningappointment SET status = 'Done' WHERE cleaning_appointment_id = $1",
      [id]
    );
    res.json("Cleaning appointment marked as done");
  } catch (err) {
    res.status(500).send(err.detail);
  }
});

// Create a new cleaning appointment
router.post("/cleaningappointments/new", async (req, res) => {
  try {
    const { beginning_time, end_time, price } = req.body;
    const result = await db.query(
      `INSERT INTO public.cleaningappointment (beginning_time, cleaningstaff_id, price, end_time, cleaning_appointment_id) 
       VALUES ($1, $2, $3, $4, COALESCE((SELECT max(cleaning_appointment_id) FROM public.cleaningappointment), 0) + 1)) RETURNING cleaning_appointment_id`,
      [beginning_time, 1, price, end_time]
    );
    res.json({
      id: result.rows[0].cleaning_appointment_id,
      message: "Cleaning appointment scheduled successfully!",
    });
  } catch (err) {
    console.error("Error creating cleaning appointment:", err);
    res.status(500).send(err.detail || err.message);
  }
});

module.exports = router;
