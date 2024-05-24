import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  CardActions,
  TextField,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";

const CleaningAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    propertyId: "",
    price: "",
    beginTime: "",
    endTime: "",
  });
  const cleaningStaffId = 1;

  useEffect(() => {
    // Fetch cleaning appointments from the API
    const fetchAppointments = async () => {
      const response = await fetch(
        `http://localhost:5001/cleaningappointments/${cleaningStaffId}`
      );
      const data = await response.json();
      setAppointments(data);
    };

    fetchAppointments();
  }, [cleaningStaffId]);

  const handleDone = async (id) => {
    // Mark appointment as done and remove it from the list
    try {
      const response = await fetch(
        `http://localhost:5001/cleaningappointments/done/${id}`,
        {
          method: "PATCH",
        }
      );
      if (response.ok) {
        setAppointments(
          appointments.filter((appointment) => appointment.id !== id)
        );
        alert(`Appointment ${id} marked as done.`);
      } else {
        alert("Failed to mark appointment as done");
      }
    } catch (error) {
      console.error("Error marking appointment as done:", error);
      alert("Failed to mark appointment as done");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({
      ...newAppointment,
      [name]: value,
    });
  };

  const handleCreateAppointment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5001/cleaningappointments/new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAppointment),
        }
      );

      if (response.ok) {
        const createdAppointment = await response.json();
        setAppointments([...appointments, createdAppointment]);
        setNewAppointment({
          propertyId: "",
          price: "",
          beginTime: "",
          endTime: "",
        });
        alert("New cleaning appointment created successfully.");
      } else {
        alert("Failed to create new cleaning appointment");
      }
    } catch (error) {
      console.error("Error creating new cleaning appointment:", error);
      alert("Failed to create new cleaning appointment");
    }
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4">Cleaning Appointments</Typography>
        <Grid container spacing={4}>
          {appointments.map((appointment) => (
            <Grid item key={appointment.id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    Property: {appointment.propertyTitle}
                  </Typography>
                  <Typography variant="body1">
                    Address: {appointment.propertyAddress}
                  </Typography>
                  <Typography variant="body2">
                    Price: ${appointment.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/guestdetails/${appointment.property_id}`}
                  >
                    Details
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => handleDone(appointment.id)}
                  >
                    Done
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box my={4}>
        <Typography variant="h4">Create New Cleaning Appointment</Typography>
        <form onSubmit={handleCreateAppointment}>
          <TextField
            fullWidth
            select
            label="Property"
            name="propertyId"
            value={newAppointment.propertyId}
            onChange={handleInputChange}
            margin="normal"
          >
            {/* Fetch and map properties */}
            {appointments.map((appointment) => (
              <MenuItem
                key={appointment.property_id}
                value={appointment.property_id}
              >
                {appointment.propertyTitle}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Price"
            name="price"
            value={newAppointment.price}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Begin Time"
            name="beginTime"
            type="datetime-local"
            value={newAppointment.beginTime}
            onChange={handleInputChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label="End Time"
            name="endTime"
            type="datetime-local"
            value={newAppointment.endTime}
            onChange={handleInputChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "1rem" }}
          >
            Create Appointment
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CleaningAppointments;
