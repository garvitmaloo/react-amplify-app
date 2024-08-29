import * as React from "react";
import { CssBaseline, AppBar, Toolbar, Typography, Button } from "@mui/material";
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
    <div style={{ display: "flex" }}>
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
          <div>
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
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
