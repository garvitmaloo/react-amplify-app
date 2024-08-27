import React from "react";
import { Typography, Box } from "@mui/material";
import { generateClient } from "aws-amplify/data";

import useAppSelector from "../../hooks/useAppSelector";
import NewPolaroidForm from "../../components/NewPolaroidForm";
import { type PolaroidData } from "../../types";
import { type Schema } from "../../../amplify/data/resource";

const styles = {
  newPolaroidContainer: {
    padding: 2,
    marginY: 0,
  },
};

const client = generateClient<Schema>();

const Home: React.FC = () => {
  const { isSignedIn } = useAppSelector((state) => state.auth);

  const handleSubmitData = async (data: PolaroidData) => {
    const { title, date, file } = data;
    let image = "";

    if (file) {
      // upload the file and get the URL
    }

    try {
      const { data: response, errors } = await client.models.Polaroid.create({
        title,
        date,
        image,
      });

      if (errors) {
        throw new Error(errors[0].message);
      }

      console.log({ response });
    } catch (error) {
      console.error(`Failed to upload file: ${error}`);
    }
  };

  return (
    <>
      {isSignedIn && (
        <Typography variant='h4' sx={{ fontWeight: 600, textAlign: "center", marginTop: 25 }}>
          Login or create account to get started
        </Typography>
      )}

      {!isSignedIn && (
        <>
          <NewPolaroidForm onSubmit={handleSubmitData} />

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
