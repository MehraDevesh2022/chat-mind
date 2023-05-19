import LockClockIcon from "@mui/icons-material/LockClock";
import React, { useState } from "react";
import { TextField, Button, Typography, Avatar } from "@material-ui/core";
import useStyles from "./LoginFromStyle";
import {Link } from "react-router-dom";
export default function ForgetPassowrd() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(
      newEmail !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
    );
  };

  const isSignInDisabled = !(email && isValidEmail);

  return (
    <div className={classes.formContainer}>
      <form className={classes.form}>
        <Avatar className={classes.avatar}>
          <LockClockIcon />
        </Avatar>
        <Typography variant="h5" component="h1" className={classes.heading}>
          Forgot your password?
        </Typography>

        {isDone && (
          <Typography variant="body1" align="center">
            An email regarding your password change has been sent to your email
            address.
          </Typography>
        )}

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          className={`${classes.emailInput} ${classes.textField}`}
          value={email}
          onChange={handleEmailChange}
          error={!isValidEmail}
          helperText={!isValidEmail && "Please enter a valid email address."}
        />

        <Button
          variant="contained"
          className={classes.loginButton}
          fullWidth
          disabled={isSignInDisabled}
          style={{ marginTop: "3rem" }}
          onClick={() => setIsDone(!isDone)}
        >
          Send email
        </Button>
        <Typography
          variant="body1"
          align="center"
          style={{ marginTop: ".3rem" }}
        >
          <Link to="/login" className={classes.createAccount}>
            Cancel
          </Link>
        </Typography>
      </form>
    </div>
  );
}
