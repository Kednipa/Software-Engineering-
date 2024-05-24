/*
Documentation for the api accessible here : https://documenter.getpostman.com/view/25834689/2sA3JRYeET#3a67e0d3-aee7-4812-a7cf-b35b1a222e07
*/

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
var userRoutes = require("./routes/user_routes.js");
var propertyRoutes = require("./routes/property_routes.js");
var guestRoutes = require("./routes/guest_routes.js");
var ownerRoutes = require("./routes/owner_routes.js");
var cleaningRoutes = require("./routes/cleaning_routes.js");

app.use(cors());
app.use(bodyParser.json());
app.use("/", userRoutes);
app.use("/", propertyRoutes);
app.use("/", guestRoutes);
app.use("/", ownerRoutes);
app.use("/", cleaningRoutes);

app.listen(5001, () => {
  console.log(`Server is running on port 5001.`);
});
