import React from "react";
import { Typography } from "@mui/material";

const Home: React.FC = () => {
  return (
    <Typography variant='h4' sx={{ fontWeight: 600, textAlign: "center", marginTop: 25 }}>
      Login or create account to get started
    </Typography>
  );
};

export default Home;
