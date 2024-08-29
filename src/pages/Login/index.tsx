import React from "react";
import { Typography, Button } from "@mui/material";
import { signIn } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

import EmailInput from "../../components/EmailInput";
import PasswordInput from "../../components/PasswordInput";
import useAppDispatch from "../../hooks/useAppDispatch";
import { authActions } from "../../store/actions";
import SimpleSnackbar from "../../components/Snackbar";

const styles = {
  mainContainer: {
    borderRadius: "4px",
    border: "1px solid #e9ecef",
    margin: "120px auto",
    width: "400px",
  },
  inputStyles: { width: "100%", margin: "16px 0" },
  formContainer: { margin: "16px 0", padding: "12px" },
  submitButton: {
    marginTop: "16px",
    padding: "15px 0",
    color: "#e9ecef",
    width: "100%",
    fontWeight: 600,
  },
};

const Login = () => {
  const [snackBar, setSnackBar] = React.useState({ show: false, message: "" });
  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { isSignedIn } = await signIn({
        username: emailInputRef.current!.value,
        password: passwordInputRef.current!.value,
      });

      if (isSignedIn) {
        dispatch(authActions.setIsSignedIn(true));
        navigate("/");
      }
    } catch (err) {
      setSnackBar({
        show: true,
        message: `Something went wrong: ${err}`,
      });
    }
  };

  const handleSnackBarClose = () => {
    setSnackBar({ show: false, message: "" });
  };

  return (
    <>
      <div style={styles.mainContainer}>
        <div
          style={{
            borderRadius: "2, 2, 0, 0",
            backgroundColor: "#e9ecef",
            height: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant='h5' sx={{ fontWeight: 600 }}>
            Log In
          </Typography>
        </div>

        <div style={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <EmailInput handleChange={handleEmailChange} ref={emailInputRef} />
            <PasswordInput handleChange={handlePasswordChange} ref={passwordInputRef} />

            <Button variant='contained' sx={styles.submitButton} type='submit'>
              Sign In
            </Button>
          </form>
        </div>
      </div>
      {snackBar.show && <SimpleSnackbar message={snackBar.message} onClose={handleSnackBarClose} />}
    </>
  );
};

export default Login;
