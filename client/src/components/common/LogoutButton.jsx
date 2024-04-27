import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/context";
const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout} = useAuth();
  const handleLogout = () => {
    logout();


    // Redirect the user to the login page or any other desired route
    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
