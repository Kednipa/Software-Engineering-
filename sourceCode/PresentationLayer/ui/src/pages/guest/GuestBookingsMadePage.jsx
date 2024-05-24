import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import useAuth from "../common/hooks/useAuth";

const Bookings = () => {
  const auth = useAuth();
  const [bookings, setBookings] = useState([]);
  const guestId = auth.id; // Use the actual user ID from auth context

  useEffect(() => {
    const fetchBookings = async () => {
      const url = `http://localhost:5001/reservation/guest/${guestId}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, [guestId]);

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4">Your Bookings</Typography>
        <Grid container spacing={4} mt={2}>
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
                    Price: ${booking.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Bookings;
