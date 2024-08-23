import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleCreateAccountClick = () => {
    navigate("/create-account");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component='nav'>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, fontWeight: 600, cursor: "pointer" }}
            onClick={handleLogoClick}
          >
            POLAROID APP
          </Typography>
          <Box>
            <Button
              sx={{ color: "#fff", textTransform: "none" }}
              onClick={handleCreateAccountClick}
            >
              Create Account
            </Button>
            <Button sx={{ color: "#fff", textTransform: "none" }} onClick={handleLoginClick}>
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
