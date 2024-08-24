/* eslint-disable react/display-name */
import React from "react";
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { type PasswordInput } from "../types";

const styles = {
  inputStyles: { width: "100%", marginY: 1 },
};

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInput>(({ handleChange }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.value);
  };

  return (
    <FormControl sx={styles.inputStyles} variant='outlined'>
      <InputLabel htmlFor='password'>Password</InputLabel>
      <OutlinedInput
        id='password'
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge='end'
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label='Password'
        onChange={handleOnChange}
        inputRef={ref}
      />
    </FormControl>
  );
});

export default PasswordInput;
