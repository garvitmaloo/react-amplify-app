import React from "react";
import { Typography, TextField, Button } from "@mui/material";

import { validateFile } from "../utils/util-methods";
import { NewPolaroidFormComponent } from "../types";
import SimpleSnackbar from "./Snackbar";

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
  const [snackBar, setSnackBar] = React.useState({ show: false, message: "" });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const title = formData.get("Title") as string;
    const date = formData.get("Date") as string;
    const file = formData.get("File") as File;

    let isValid = false,
      message = "No file uploaded";

    const fileValidationResult = validateFile(file);
    isValid = fileValidationResult.isValid;
    message = fileValidationResult.message;

    try {
      if (file.name && !isValid) throw new Error(message);

      onSubmit({ title, date, file });
    } catch (error) {
      setSnackBar({ show: true, message: `${error}` });
    }
  };

  const handleSnackBarClose = () => {
    setSnackBar({ show: false, message: "" });
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
              required
            />
            <TextField name='Date' variant='outlined' type='date' sx={styles.inputs} />
            <TextField name='File' type='file' sx={styles.inputs} required />
          </div>

          <Button variant='contained' type='submit'>
            Add
          </Button>
        </form>
      </div>

      {snackBar.show && <SimpleSnackbar message={snackBar.message} onClose={handleSnackBarClose} />}
    </div>
  );
};

export default NewPolaroidForm;
