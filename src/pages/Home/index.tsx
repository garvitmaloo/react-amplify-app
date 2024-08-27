import React from "react";
import { Typography, Box } from "@mui/material";

import useAppSelector from "../../hooks/useAppSelector";
import NewPolaroidForm from "../../components/NewPolaroidForm";

const styles = {
  newPolaroidContainer: {
    padding: 2,
    marginY: 0,
  },
};

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
        <>
          <NewPolaroidForm />

          <Box sx={{ ...styles.newPolaroidContainer, marginTop: 2 }}>
            <Typography sx={{ marginBottom: 1, fontWeight: 600 }} variant='h6'>
              No Polaroids.. Try adding a new one!
            </Typography>
          </Box>
        </>
      )}
    </>
  );
};

export default Home;
