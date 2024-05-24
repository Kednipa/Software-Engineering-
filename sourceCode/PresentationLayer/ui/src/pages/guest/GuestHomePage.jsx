import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import BookingsIcon from "@mui/icons-material/Book";
import useAuth from "../common/hooks/useAuth";

const Home = () => {
  const auth = useAuth();
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState(properties);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    filterProperties(query);
  };

  const filterProperties = (query) => {
    const filtered = properties.filter(
      (property) =>
        property.name.toLowerCase().includes(query) ||
        property.address.toLowerCase().includes(query) ||
        property.description.toLowerCase().includes(query)
    );
    setFilteredProperties(filtered);
  };

  const handleLogout = () => {
    auth.isLoggedIn = false;
    auth.user = "";
    auth.userId = 0;
    auth.id = 0;
    navigate("/");
  };

  useEffect(() => {
    // Fetch all verified properties from the API
    const fetchProperties = async () => {
      const response = await fetch("http://localhost:5001/property");
      const data = await response.json();
      setProperties(data);
      setFilteredProperties(data); // Initially, show all properties
    };

    fetchProperties();
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Home
          </Typography>
          <Button color="inherit" component={Link} to="/guestbookings">
            <BookingsIcon />
            <Box ml={1}>My Bookings</Box>
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box my={4}>
          <TextField
            fullWidth
            label="Search for properties"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>
        <Grid container spacing={4}>
          {filteredProperties.map((property) => (
            <Grid item key={property.property_id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={property.images}
                  alt={property.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {property.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {property.address}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
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
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box my={4}>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
