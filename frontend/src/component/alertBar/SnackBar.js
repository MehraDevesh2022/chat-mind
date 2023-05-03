import React, { useState, useEffect } from "react";
import { Snackbar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: theme.palette.success.main,
  },
  error: {
    backgroundColor: theme.palette.error.main,
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
}));

function useSnackbar() {
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const classes = useStyles();

  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  const [open, setOpen] = useState(false);

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  const showSnackbar = (newMessage, newSeverity = "success") => {
    setMessage(newMessage);
    setSeverity(newSeverity);
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        ContentProps={{
          classes: {
            root: classes[severity],
          },
        }}
        action={
          <Button color="inherit" size="small" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      />
      {showSnackbar}
    </>
  );
}

export default useSnackbar;
