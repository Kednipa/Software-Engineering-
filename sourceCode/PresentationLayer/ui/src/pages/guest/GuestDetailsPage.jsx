import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  TextField,
  Button,
} from "@mui/material";
import useAuth from "../common/hooks/useAuth";

const GuestDetailsPage = () => {
  const { id } = useParams();
  const auth = useAuth();
  const [property, setProperty] = useState(null);
  const [booking, setBooking] = useState({
    fromdatetime: "",
    todatetime: "",
    guests: 1,
  });

  useEffect(() => {
    // Fetch property details by ID
    const fetchProperty = async () => {
      const response = await fetch(`http://localhost:5001/property/${id}`);
      const data = await response.json();
      setProperty(data[0]); // Assuming the API returns an array of properties
    };

    fetchProperty();
  }, [id]);

  const handleInputChange = (prop) => (event) => {
    setBooking({ ...booking, [prop]: event.target.value });
  };

  const handleBookingSubmit = async (event) => {
    event.preventDefault();
    const url = "http://localhost:5001/reservation/new";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...booking,
          property_id: property.property_id,
          guest_id: auth.id, // Use the actual user ID from auth context
        }),
      });
      const data = await response.json();
      console.log(data);
      alert("Booking successful!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to make a booking");
    }
  };

  if (!property) {
    return <Typography variant="h6">Property not found</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Card>
          <CardMedia
            component="img"
            height="300"
            image={property.images}
            alt={property.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {property.name}
            </Typography>
            <Typography variant="h6" color="textSecondary" component="div">
              {property.address}
            </Typography>
            <Typography variant="body1" component="p" my={2}>
              {property.description}
            </Typography>
            <Typography variant="h5" component="div">
              ${property.dailyrate} per night
            </Typography>
          </CardContent>
        </Card>
        <Box mt={4}>
          <form onSubmit={handleBookingSubmit}>
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              variant="outlined"
              value={booking.fromdatetime}
              onChange={handleInputChange("fromdatetime")}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="End Date"
              type="date"
              variant="outlined"
              value={booking.todatetime}
              onChange={handleInputChange("todatetime")}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Number of Guests"
              type="number"
              variant="outlined"
              value={booking.guests}
              onChange={handleInputChange("guests")}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: 1 } }}
            />
            <Button variant="contained" color="primary" type="submit">
              Book Now
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default GuestDetailsPage;
