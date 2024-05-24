import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Button,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import useAuth from "../common/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const OwnerPropertiesPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchPropertiesAndBookings = async () => {
      try {
        // Fetch properties owned by the user
        const propertiesResponse = await fetch(
          `http://localhost:5001/property/owner`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: auth.id }),
          }
        );

        if (!propertiesResponse.ok) {
          throw new Error("Failed to fetch properties");
        }

        const propertiesData = await propertiesResponse.json();
        setProperties(propertiesData);

        // Fetch bookings for each property
        const bookingsData = [];
        for (const property of propertiesData) {
          const bookingsResponse = await fetch(
            `http://localhost:5001/reservation/property`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ property_id: property.property_id }),
            }
          );

          if (!bookingsResponse.ok) {
            throw new Error("Failed to fetch bookings");
          }

          const propertyBookings = await bookingsResponse.json();
          bookingsData.push(...propertyBookings);
        }
        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching properties and bookings:", error);
      }
    };

    fetchPropertiesAndBookings();
  }, [auth.id]);

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
        <Typography variant="h4">Your Properties</Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/ownerlisting"
        >
          List a New Property
        </Button>
      </Box>
      <Grid container spacing={4}>
        {properties.map((property) => (
          <Grid item key={property.property_id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={property.images}
                alt={property.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {property.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {property.address}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {property.description}
                </Typography>
                <Typography variant="h6" component="p">
                  ${property.dailyrate} per night
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  component={Link}
                  to={`/guestdetails/${property.property_id}`}
                >
                  View Details
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  component={Link}
                  to={`/newcleaningappointment/${property.property_id}`}
                >
                  Cleaning Appointments
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box my={4}>
        <Typography variant="h4">Bookings on Your Properties</Typography>
        <Grid container spacing={4}>
          {bookings.map((booking) => (
            <Grid item key={booking.reservation_id} xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    Property ID: {booking.property_id}
                  </Typography>
                  <Typography variant="body1">
                    Start Date: {booking.fromdatetime}
                  </Typography>
                  <Typography variant="body2">
                    End Date: {booking.todatetime}
                  </Typography>
                  <Typography variant="body2">
                    Guests: {booking.guests}
                  </Typography>
                  <Typography variant="body2">
                    Price: ${booking.price}
                  </Typography>
                </CardContent>
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

export default OwnerPropertiesPage;
