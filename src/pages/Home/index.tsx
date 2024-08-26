import React from "react";
import { Typography } from "@mui/material";

import useAppSelector from "../../hooks/useAppSelector";

const Home: React.FC = () => {
  const { isSignedIn } = useAppSelector((state) => state.auth);

  return (
    <>
      {!isSignedIn && (
        <Typography variant='h4' sx={{ fontWeight: 600, textAlign: "center", marginTop: 25 }}>
          Login or create account to get started
        </Typography>
      )}

      {isSignedIn && (
        <Typography variant='h4' sx={{ fontWeight: 600, textAlign: "center", marginTop: 25 }}>
          Welcome
        </Typography>
      )}
    </>
  );
};

export default Home;
