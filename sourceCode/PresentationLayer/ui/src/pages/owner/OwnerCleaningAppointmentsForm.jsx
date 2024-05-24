import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useParams } from "react-router-dom";

const OwnerCleaningAppointmentForm = () => {
  const [appointment, setAppointment] = useState({
    beginning_time: "",
    end_time: "",
    price: "",
  });

  const handleInputChange = (prop) => (event) => {
    setAppointment({ ...appointment, [prop]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `http://localhost:5001/cleaningappointments/new`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...appointment }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert(data.message);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert("Failed to schedule cleaning appointment");
      }
    } catch (error) {
      console.error("Error scheduling cleaning appointment:", error);
      alert("Failed to schedule cleaning appointment");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4">Schedule a Cleaning Appointment</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Beginning Time"
            type="datetime-local"
            variant="outlined"
            value={appointment.beginning_time}
            onChange={handleInputChange("beginning_time")}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="End Time"
            type="datetime-local"
            variant="outlined"
            value={appointment.end_time}
            onChange={handleInputChange("end_time")}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Price"
            type="number"
            variant="outlined"
            value={appointment.price}
            onChange={handleInputChange("price")}
            margin="normal"
          />
          <Button variant="contained" color="primary" type="submit">
            Schedule Appointment
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default OwnerCleaningAppointmentForm;
