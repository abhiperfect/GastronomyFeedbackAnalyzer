import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/context";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Redirect the user to the login page or any other desired route
    navigate("/login");
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outlined"
      startIcon={<ExitToAppOutlinedIcon />}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
