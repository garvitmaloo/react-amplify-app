import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { type Snackbar as SnackbarProps } from "../types";

const SimpleSnackbar: React.FC<SnackbarProps> = (props) => {
  const { message, onClose, hideAfterTime } = props;
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const action = (
    <React.Fragment>
      <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={hideAfterTime ?? 5000}
      onClose={handleClose}
      message={message}
      action={action}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    />
  );
};

export default SimpleSnackbar;
