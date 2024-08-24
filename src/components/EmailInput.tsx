/* eslint-disable react/display-name */
import React from "react";
import { TextField } from "@mui/material";

import { type EmailInput } from "../types";

const styles = {
  inputStyles: { width: "100%", marginY: 1 },
};

const EmailInput = React.forwardRef<HTMLInputElement, EmailInput>(({ handleChange }, ref) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.value);
  };

  return (
    <TextField
      id='email'
      label='Email'
      variant='outlined'
      sx={styles.inputStyles}
      type='email'
      onChange={handleOnChange}
      inputRef={ref}
    />
  );
});

export default EmailInput;
