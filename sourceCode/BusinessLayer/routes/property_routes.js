const express = require("express");
const db = require("../database_connection_service.js");
const router = express.Router();

// Get verified properties
router.get("/property", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM public.property WHERE verified = true"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching verified properties:", err);
    res.status(500).send(err.detail || err.message);
  }
});

// Get unverified properties
router.get("/property/unverified", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM public.property WHERE verified = false"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching unverified properties:", err);
    res.status(500).send(err.detail || err.message);
  }
});

// Get a single property by id
router.get("/property/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.query(
      "SELECT * FROM public.property WHERE property_id = $1",
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching property by ID:", err);
    res.status(500).send(err.detail || err.message);
  }
});

// Get properties by owner id
router.post("/property/owner", async (req, res) => {
  try {
    const { id } = req.body;
    const result = await db.query(
      "SELECT * FROM public.property WHERE owner_id = $1",
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching properties by owner ID:", err);
    res.status(500).send(err.detail || err.message);
  }
});

// Create a new property
router.post("/property/new", async (req, res) => {
  try {
    const {
      address,
      dailyrate,
      description,
      images,
      name,
      verified,
      owner_id,
    } = req.body;

    // Generate new property_id using COALESCE
    const result = await db.query(
      'INSERT INTO public.property (address, dailyrate, description, images, name, verified, property_id, owner_id) VALUES ($1, $2, $3, $4, $5, $6, COALESCE((SELECT max("property_id") FROM public.property), 0) + 1, $7) RETURNING property_id',
      [address, dailyrate, description, images, name, verified, owner_id]
    );

    console.log("Property added:", result.rows[0]);
    res.json({
      message: "Property added successfully",
      property_id: result.rows[0].property_id,
    });
  } catch (err) {
    console.error("Error adding property:", err);
    res.status(500).send(err.detail || err.message);
  }
});

// To verify a property
router.patch("/property/verify/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.query(
      "UPDATE public.property SET verified = true WHERE property_id = $1 RETURNING property_id",
      [id]
    );
    res.json({
      message: "Property verified successfully",
      property_id: result.rows[0].property_id,
    });
  } catch (err) {
    console.error("Error verifying property:", err);
    res.status(500).send(err.detail || err.message);
  }
});

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
    console.error("Error fetching reservations for property:", err);
    res.status(500).send(err.detail || err.message);
  }
});

// Get pending reservations
router.get("/reservation/pending", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM public.property WHERE verified = false"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching pending reservations:", err);
    res.status(500).send(err.detail || err.message);
  }
});

module.exports = router;
