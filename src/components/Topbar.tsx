import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { signOut } from "aws-amplify/auth";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { authActions } from "../store/actions";

export default function TopBar() {
  const navigate = useNavigate();
  const { isSignedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleCreateAccountClick = () => {
    navigate("/create-account");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = async () => {
    try {
      await signOut();
      dispatch(authActions.setIsSignedIn(false));
      dispatch(authActions.setUserEmail(null));
      navigate("/login");
    } catch (err) {
      console.error(`Something went wrong: ${err}`);
    }
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
            {!isSignedIn ? (
              <>
                <Button
                  sx={{ color: "#fff", textTransform: "none" }}
                  onClick={handleCreateAccountClick}
                >
                  Create Account
                </Button>
                <Button sx={{ color: "#fff", textTransform: "none" }} onClick={handleLoginClick}>
                  Login
                </Button>
              </>
            ) : (
              <Button sx={{ color: "#fff", textTransform: "none" }} onClick={handleLogoutClick}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
