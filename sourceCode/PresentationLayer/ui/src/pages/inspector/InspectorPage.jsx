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
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../common/hooks/useAuth";

const InspectorPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [bookings, setBookings] = useState([]);
  const [unverifiedProperties, setUnverifiedProperties] = useState([]);

  useEffect(() => {
    const fetchBookingsAndProperties = async () => {
      try {
        // Fetch pending bookings
        const bookingsResponse = await fetch(
          "http://localhost:5001/reservation/pending"
        );
        const bookingsData = await bookingsResponse.json();
        setBookings(bookingsData);

        // Fetch unverified properties
        const propertiesResponse = await fetch(
          "http://localhost:5001/property/unverified"
        );
        const propertiesData = await propertiesResponse.json();
        setUnverifiedProperties(propertiesData);
      } catch (error) {
        console.error("Error fetching bookings and properties:", error);
      }
    };

    fetchBookingsAndProperties();
  }, []);

  const handleApproveBooking = (id) => {
    // Logic to approve booking
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: "Approved" } : booking
      )
    );
    alert(`Booking ${id} approved.`);
  };

  const handleRejectBooking = (id) => {
    // Logic to reject booking
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: "Rejected" } : booking
      )
    );
    alert(`Booking ${id} rejected.`);
  };

  const handleApproveProperty = async (id) => {
    // Logic to approve property
    try {
      const response = await fetch(
        `http://localhost:5001/property/verify/${id}`,
        {
          method: "PATCH",
        }
      );
      const result = await response.json();
      if (response.ok) {
        setUnverifiedProperties(
          unverifiedProperties.filter((property) => property.property_id !== id)
        );
        alert(result);
      } else {
        alert("Failed to approve property");
      }
    } catch (error) {
      console.error("Error approving property:", error);
      alert("Failed to approve property");
    }
  };

  const handleLogout = () => {
    auth.isLoggedIn = false;
    auth.user = "";
    auth.userId = 0;
    auth.id = 0;
    navigate("/");
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4">Pending Bookings</Typography>
        <Grid container spacing={4}>
          {bookings
            .filter((booking) => booking.status === "Pending")
            .map((booking) => (
              <Grid item key={booking.id} xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      Property: {booking.propertyTitle}
                    </Typography>
                    <Typography variant="body1">
                      Address: {booking.propertyAddress}
                    </Typography>
                    <Typography variant="body2">
                      Start Date: {booking.startDate}
                    </Typography>
                    <Typography variant="body2">
                      End Date: {booking.endDate}
                    </Typography>
                    <Typography variant="body2">
                      Guests: {booking.guests}
                    </Typography>
                    <Typography variant="body2">
                      Status: {booking.status}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleApproveBooking(booking.id)}
                    >
                      Approve
                    </Button>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => handleRejectBooking(booking.id)}
                    >
                      Don't Approve
                    </Button>
                    <Button
                      size="small"
                      color="inherit"
                      component={Link}
                      to={`/guestdetails/${booking.propertyId}`}
                    >
                      Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
      <Box my={4}>
        <Typography variant="h4">Unverified Properties</Typography>
        <Grid container spacing={4}>
          {unverifiedProperties.map((property) => (
            <Grid item key={property.property_id} xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    Property: {property.name}
                  </Typography>
                  <Typography variant="body1">
                    Address: {property.address}
                  </Typography>
                  <Typography variant="body2">
                    Description: {property.description}
                  </Typography>
                  <Typography variant="body2">
                    Daily Rate: ${property.dailyrate}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleApproveProperty(property.property_id)}
                  >
                    Approve
                  </Button>
                  <Button
                    size="small"
                    color="inherit"
                    component={Link}
                    to={`/guestdetails/${property.property_id}`}
                  >
                    Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box my={4}>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default InspectorPage;
