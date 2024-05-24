import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import useAuth from "../common/hooks/useAuth";

const OwnerListingPropertiesPage = () => {
  const auth = useAuth();
  const [property, setProperty] = useState({
    address: "",
    dailyrate: 0,
    description: "",
    images: "",
    name: "",
    verified: false,
  });

  const handleInputChange = (prop) => (event) => {
    setProperty({ ...property, [prop]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://localhost:5001/property/new";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...property, owner_id: auth.id }), // Add owner_id to the request
      });
      const data = await response.json();
      console.log(data);
      alert("Property listed successfully!");
    } catch (error) {
      console.error("Error listing property:", error);
      alert("Failed to list property");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4">List a New Property</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            value={property.address}
            onChange={handleInputChange("address")}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Daily Rate"
            variant="outlined"
            value={property.dailyrate}
            onChange={handleInputChange("dailyrate")}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            value={property.description}
            onChange={handleInputChange("description")}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Images (URL)"
            variant="outlined"
            value={property.images}
            onChange={handleInputChange("images")}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={property.name}
            onChange={handleInputChange("name")}
            margin="normal"
          />
          <Button variant="contained" color="primary" type="submit">
            List Property
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default OwnerListingPropertiesPage;
