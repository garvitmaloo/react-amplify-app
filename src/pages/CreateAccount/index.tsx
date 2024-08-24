import React from "react";
import { Box, Typography, Button } from "@mui/material";

import EmailInput from "../../components/EmailInput";
import PasswordInput from "../../components/PasswordInput";

const styles = {
  mainContainer: {
    borderRadius: 2,
    border: "1px solid #e9ecef",
    marginY: 16,
    marginX: "auto",
    width: 400,
  },
  inputStyles: { width: "100%", marginY: 1 },
  formContainer: { marginY: 2, padding: 3 },
  submitButton: {
    marginTop: 3,
    paddingY: 1.5,
    color: "#e9ecef",
    width: "100%",
    fontWeight: 600,
  },
};

const CreateAccount = () => {
  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);

  const handleEmailChange = (value: string) => {
    if (emailInputRef.current) {
      emailInputRef.current.value = value;
    }
  };

  const handlePasswordChange = (value: string) => {
    if (passwordInputRef.current) {
      passwordInputRef.current.value = value;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({ email: emailInputRef.current?.value, password: passwordInputRef.current?.value });
  };

  return (
    <Box sx={styles.mainContainer}>
      <Box
        sx={{
          borderRadius: "2, 2, 0, 0",
          backgroundColor: "#e9ecef",
          height: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant='h5' sx={{ fontWeight: 600 }}>
          Create Account
        </Typography>
      </Box>

      <Box sx={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <EmailInput handleChange={handleEmailChange} ref={emailInputRef} />
          <PasswordInput handleChange={handlePasswordChange} ref={passwordInputRef} />

          <Button variant='contained' sx={styles.submitButton} type='submit'>
            Sign Up
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default CreateAccount;
