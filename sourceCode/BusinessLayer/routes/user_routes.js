const express = require("express");
const db = require("../database_connection_service.js");
const { verifyLogin } = require("../business_logic.js");
const router = express.Router();

// To verify login
router.post("/login", async (req, res) => {
  const { contact, password } = req.body;
  try {
    const result = await verifyLogin(contact, password);
    if (result) {
      res.json(result);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get all users
router.get("/user", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM public.generaluser");
    res.json(result.rows);
  } catch (err) {
    console.error("Get users error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Add a new user
router.post("/user/new", async (req, res) => {
  try {
    const { contact, password } = req.body;
    const result = await db.query(
      `INSERT INTO public.generaluser 
        (firstname, lastname, portrait, user_id, contactinformation, password) 
       VALUES 
        ($1, $2, $3, COALESCE((SELECT max(user_id) FROM public.generaluser), 0) + 1, $4, $5)
       RETURNING user_id`,
      ["", "", null, contact, password]
    );
    console.log("New user created with user_id:", result.rows[0].user_id);
    res.json({ user_id: result.rows[0].user_id });
  } catch (err) {
    console.error("Add user error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Make a general user an owner
router.post("/owner/new", async (req, res) => {
  try {
    const { user_id } = req.body;
    const result = await db.query(
      `INSERT INTO public.owner 
        (owner_id, user_id) 
       VALUES 
        (COALESCE((SELECT max(owner_id) FROM public.owner), 0) + 1, $1)
       RETURNING owner_id`,
      [user_id]
    );
    res.json({ specific_id: result.rows[0].owner_id });
  } catch (err) {
    console.error("Add owner error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Make a general user a guest
router.post("/guest/new", async (req, res) => {
  try {
    const { user_id } = req.body;
    const result = await db.query(
      `INSERT INTO public.guest 
        (guest_id, user_id) 
       VALUES 
        (COALESCE((SELECT max(guest_id) FROM public.guest), 0) + 1, $1)
       RETURNING guest_id`,
      [user_id]
    );
    res.json({ specific_id: result.rows[0].guest_id });
  } catch (err) {
    console.error("Add guest error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Make a general user an inspector
router.post("/inspector/new", async (req, res) => {
  try {
    const { user_id } = req.body;
    const result = await db.query(
      `INSERT INTO public.inspector 
        (inspector_id, user_id) 
       VALUES 
        (COALESCE((SELECT max(inspector_id) FROM public.inspector), 0) + 1, $1)
       RETURNING inspector_id`,
      [user_id]
    );
    res.json({ specific_id: result.rows[0].inspector_id });
  } catch (err) {
    console.error("Add inspector error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get user type and ID by contact information
router.get("/user/type", async (req, res) => {
  try {
    const { contact } = req.query;
    const userResult = await db.query(
      "SELECT user_id FROM public.generaluser WHERE contactinformation = $1",
      [contact]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = userResult.rows[0].user_id;
    let userType, specificId;

    const ownerResult = await db.query(
      "SELECT owner_id FROM public.owner WHERE user_id = $1",
      [userId]
    );
    if (ownerResult.rows.length > 0) {
      userType = "owner";
      specificId = ownerResult.rows[0].owner_id;
    }

    const guestResult = await db.query(
      "SELECT guest_id FROM public.guest WHERE user_id = $1",
      [userId]
    );
    if (guestResult.rows.length > 0) {
      userType = "guest";
      specificId = guestResult.rows[0].guest_id;
    }

    const inspectorResult = await db.query(
      "SELECT inspector_id FROM public.inspector WHERE user_id = $1",
      [userId]
    );
    if (inspectorResult.rows.length > 0) {
      userType = "inspector";
      specificId = inspectorResult.rows[0].inspector_id;
    }

    if (!userType) {
      return res.status(404).json({ error: "User type not found" });
    }

    res.json({ user_id: userId, user_type: userType, specific_id: specificId });
  } catch (err) {
    console.error("Get user type error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
