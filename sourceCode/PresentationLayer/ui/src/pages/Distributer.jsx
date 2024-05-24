import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./common/hooks/useAuth";

const Distributer = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/login");
    } else if (auth.user === "owner") {
      navigate("/ownerproperties");
    } else if (auth.user === "guest") {
      navigate("/guesthome");
    } else if (auth.user === "inspector") {
      navigate("/inspector");
    } else if (auth.user === "cleaning_stuff") {
      navigate("/cleaningappointments");
    }
  }, [auth, navigate]);

  return <div>Loading...</div>;
};

export default Distributer;
