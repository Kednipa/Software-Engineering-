import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ProjectRoutes from "./pages/Routes";

const App = () => {
  return (
    <Router>
      <ProjectRoutes />
    </Router>
  );
};

export default App;

/*const navigate = useNavigate();
  const auth = useAuth();
  return auth.isLoggedIn ? (
    navigate("/login")
  ) : //
  auth.user === "owner" ? (
    <Link to="/ownerproperties">ownerproperties</Link>
  ) : auth.user === "guest" ? (
    <Link to="/guesthome">guesthome</Link>
  ) : auth.user === "inspector" ? (
    <Link to="/inspector">inspector</Link>
  ) : (
    <></>
  );*/
