import React, { useState } from "react";
import {
  Container,
  Tab,
  Tabs,
  Box,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <h1>{children}</h1>
        </Box>
      )}
    </div>
  );
}

function LoginSignup() {
  const [value, setValue] = useState(0);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    userType: "owner",
  });

  const auth = useAuth();
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (prop) => (event) => {
    setCredentials({ ...credentials, [prop]: event.target.value });
  };

  const handleUserTypeChange = (event) => {
    setCredentials({ ...credentials, userType: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isLogin = value === 0;
    const url = isLogin
      ? "http://localhost:5001/login"
      : "http://localhost:5001/user/new";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact: credentials.email,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      if (isLogin) {
        // Handle login
        const userTypeResponse = await fetch(
          `http://localhost:5001/user/type?contact=${credentials.email}`
        );
        if (!userTypeResponse.ok) {
          throw new Error("Failed to fetch user type");
        }

        const userTypeData = await userTypeResponse.json();
        auth.isLoggedIn = true;
        auth.user = userTypeData.user_type;
        auth.id = userTypeData.specific_id;
        auth.userId = userTypeData.user_id;
        navigate("/");
      } else {
        // Handle signup
        const data = await response.json();
        const userId = data.user_id;

        const userTypeUrlMap = {
          owner: "http://localhost:5001/owner/new",
          guest: "http://localhost:5001/guest/new",
          inspector: "http://localhost:5001/inspector/new",
        };

        const userTypeUrl = userTypeUrlMap[credentials.userType];

        const userTypeResponse = await fetch(userTypeUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId }),
        });

        if (!userTypeResponse.ok) {
          throw new Error("Failed to create user type");
        }

        const userTypeData = await userTypeResponse.json();
        auth.isLoggedIn = true;
        auth.user = credentials.userType;
        auth.id = userTypeData.specific_id; // Adjust based on specific ID type
        auth.userId = userId;
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit");
    }
  };

  return (
    <Container maxWidth="sm">
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="login signup tabs"
      >
        <Tab label="Login" />
        <Tab label="Signup" />
      </Tabs>
      <TabPanel value={value} index={0}>
        Login Form
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={credentials.email}
          onChange={handleInputChange("email")}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          value={credentials.password}
          onChange={handleInputChange("password")}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Login
        </Button>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Signup Form
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={credentials.email}
          onChange={handleInputChange("email")}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          value={credentials.password}
          onChange={handleInputChange("password")}
          margin="normal"
        />
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">User Type</FormLabel>
          <RadioGroup
            row
            value={credentials.userType}
            onChange={handleUserTypeChange}
          >
            <FormControlLabel value="owner" control={<Radio />} label="Owner" />
            <FormControlLabel value="guest" control={<Radio />} label="Guest" />
            <FormControlLabel
              value="inspector"
              control={<Radio />}
              label="Inspector"
            />
          </RadioGroup>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Signup
        </Button>
      </TabPanel>
    </Container>
  );
}

export default LoginSignup;
