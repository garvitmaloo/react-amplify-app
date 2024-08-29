import React from "react";
import { Typography, TextField, Button } from "@mui/material";

import { validateFile } from "../utils/util-methods";
import { NewPolaroidFormComponent } from "../types";

const styles = {
  newPolaroidContainer: {
    padding: "24px",
    margin: 0,
  },
  formContainer: { display: "flex", gap: "1rem", margin: "1rem 0" },
  inputs: {
    width: "240px",
  },
};

const NewPolaroidForm: React.FC<NewPolaroidFormComponent> = ({ onSubmit }) => {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const title = formData.get("Title") as string;
    const date = formData.get("Date") as string;
    const file = formData.get("File") as File;

    let isValid = false,
      message = "No file uploaded";

    if (file.name) {
      isValid = validateFile(file).isValid;
      message = validateFile(file).message;
    }

    try {
      if (file.name && !isValid) throw new Error(message);

      onSubmit({ title, date, file });
    } catch (error) {
      console.error(`Something went wrong: ${error}`);
    }
  };

  return (
    <div style={styles.newPolaroidContainer}>
      <Typography sx={{ marginBottom: 1, fontWeight: 600 }} variant='h6'>
        Add new polaroid
      </Typography>

      <div>
        <form
          onSubmit={handleFormSubmit}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <div style={styles.formContainer}>
            <TextField
              name='Title'
              variant='outlined'
              type='text'
              label='Title'
              sx={styles.inputs}
            />
            <TextField name='Date' variant='outlined' type='date' sx={styles.inputs} />
            <TextField name='File' type='file' sx={styles.inputs} />
          </div>

          <Button variant='contained' type='submit'>
            Add
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewPolaroidForm;
