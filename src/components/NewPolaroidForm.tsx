import React from "react";
import { Typography, Box, TextField, Button } from "@mui/material";

const styles = {
  newPolaroidContainer: {
    padding: 2,
    marginY: 0,
  },
  formContainer: { display: "flex", gap: "1rem", margin: "1rem 0" },
  inputs: {
    width: "240px",
  },
};

const NewPolaroidForm = () => {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const title = formData.get("Title") as string;
    const date = formData.get("Date") as string;
    const file = formData.get("File") as File;

    console.log({ title, date, file });
  };

  return (
    <Box sx={styles.newPolaroidContainer}>
      <Typography sx={{ marginBottom: 1, fontWeight: 600 }} variant='h6'>
        Add new polaroid
      </Typography>

      <Box>
        <form
          onSubmit={handleFormSubmit}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <Box sx={styles.formContainer}>
            <TextField
              name='Title'
              variant='outlined'
              type='text'
              label='Title'
              sx={styles.inputs}
            />
            <TextField name='Date' variant='outlined' type='date' sx={styles.inputs} />
            <TextField name='File' type='file' sx={styles.inputs} />
          </Box>

          <Button variant='contained' type='submit'>
            Add
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default NewPolaroidForm;
