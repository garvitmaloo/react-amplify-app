import React from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { signUp, confirmSignUp } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

import EmailInput from "../../components/EmailInput";
import PasswordInput from "../../components/PasswordInput";
import SimpleSnackbar from "../../components/Snackbar";

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
  const [snackBar, setSnackBar] = React.useState({ show: false, message: "" });
  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);
  const otpInputRef = React.useRef<HTMLInputElement>(null);
  const [showOTPVerificationUI, setShowOTPVerificationUI] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const handleEmailChange = (value: string) => {
    if (value && emailInputRef.current) {
      emailInputRef.current.value = value;
    }
  };

  const handlePasswordChange = (value: string) => {
    if (passwordInputRef.current) {
      passwordInputRef.current.value = value;
    }
  };

  const handleOTPChange = (value: string) => {
    if (otpInputRef.current) {
      otpInputRef.current.value = value;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { userId } = await signUp({
        username: emailInputRef.current!.value,
        password: passwordInputRef.current!.value,
        options: {
          userAttributes: {
            email: emailInputRef.current?.value,
          },
        },
      });

      if (userId) {
        setShowOTPVerificationUI(true);
      }
    } catch (e) {
      setSnackBar({
        show: true,
        message: `Something went wrong: ${e}`,
      });
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { isSignUpComplete } = await confirmSignUp({
        username: emailInputRef.current!.value,
        confirmationCode: otpInputRef.current!.value,
      });

      if (isSignUpComplete) {
        navigate("/login");
      }
    } catch (e) {
      setSnackBar({ show: true, message: `Something went wrong: ${e}` });
    }
  };

  const handleSnackBarClose = () => {
    setSnackBar({
      message: "",
      show: false,
    });
  };

  return (
    <>
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
            {showOTPVerificationUI ? "Verify OTP" : "Create Account"}
          </Typography>
        </Box>

        <Box sx={styles.formContainer}>
          <form
            onSubmit={handleSubmit}
            style={{ display: showOTPVerificationUI ? "none" : "block" }}
          >
            <EmailInput handleChange={handleEmailChange} ref={emailInputRef} />
            <PasswordInput handleChange={handlePasswordChange} ref={passwordInputRef} />

            <Button variant='contained' sx={styles.submitButton} type='submit'>
              Sign Up
            </Button>
          </form>

          <form
            onSubmit={handleVerifyOTP}
            style={{ display: showOTPVerificationUI ? "block" : "none" }}
          >
            <TextField
              onChange={(e) => handleOTPChange(e.target.value)}
              placeholder='Enter OTP'
              ref={otpInputRef}
              sx={{ width: "100%" }}
            />

            <Button variant='contained' sx={styles.submitButton} type='submit'>
              Verify OTP
            </Button>
          </form>
        </Box>
      </Box>

      {snackBar.show && <SimpleSnackbar message={snackBar.message} onClose={handleSnackBarClose} />}
    </>
  );
};

export default CreateAccount;
