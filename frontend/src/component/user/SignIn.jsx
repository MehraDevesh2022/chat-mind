import React, { useState , useEffect} from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Grid,
  Avatar,
} from "@material-ui/core";
import useStyles from "./LoginFromStyle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link } from "react-router-dom";
import { useSelector ,useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { clearError , loginUser} from "../../action/userAction";
import Loader from "../utiils/Loader";
import HomePage from "../../Pages/HomePage";

export default function LoginForm() {

    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const { error, isAuthenticated, loading ,user } = useSelector(
   (state) => state.UserData
 );
  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(
      newEmail !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
    );
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit  =(e) =>{
     e.preventDefault();
     dispatch(loginUser(email , password))

  }
  useEffect(() =>{
    if(error){
      alert.error(error);
      dispatch(clearError());
    }
    if(isAuthenticated){
      alert.success(`Welcome Back ${user.name} !`);
      history.push("/chat")
    }
  },[alert , error ,history , isAuthenticated , dispatch , user])
  const isSignInDisabled = !(email && password && isValidEmail);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
        <HomePage/>
          <div className={classes.formContainer}>
            <form className={classes.form}>
              <Avatar className={classes.avatar}>
                <LockOpenIcon />
              </Avatar>
              <Typography
                variant="h5"
                component="h1"
                className={classes.heading}
              >
                Sign in to Your Account
              </Typography>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                className={`${classes.emailInput} ${classes.textField}`}
                value={email}
                onChange={handleEmailChange}
                error={!isValidEmail}
                helperText={
                  !isValidEmail && "Please enter a valid email address."
                }
              />
              <TextField
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                fullWidth
                className={`${classes.passwordInput} ${classes.textField}`}
                InputProps={{
                  endAdornment: (
                    <Button
                      variant="outlined"
                      className={classes.showPasswordButton}
                      onClick={handleShowPasswordClick}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </Button>
                  ),
                }}
                value={password}
                onChange={handlePasswordChange}
              />
              <Grid container className={classes.rememberMeContainer}>
                <Grid item>
                  <FormControlLabel
                    control={<Checkbox color="#6600CC" />}
                    label="Remember me"
                  />
                </Grid>
                <Grid item>
                  <Link
                    to="/forgot/password"
                    className={classes.forgotPasswordLink}
                  >
                    Forgot your password?
                  </Link>
                </Grid>
              </Grid>
              <Typography
                variant="body2"
                className={classes.termsAndConditionsText}
              >
                I accept the <b>ChatMind</b> Terms of Use and acknowledge{" "}
                <b>ChatMind</b> will use my information in accordance with its
                <Link to="/" className={classes.privacyText}>
                  Privacy Policy.
                </Link>
              </Typography>
              <Button
                variant="contained"
                className={classes.loginButton}
                fullWidth
                disabled={isSignInDisabled}
                onClick={handleFormSubmit}
              >
                Sign in
              </Button>
              <Typography
                variant="body1"
                align="center"
                style={{ marginTop: "1rem" }}
              >
                Don't have an account?
                <Link to="/" className={classes.createAccount}>
                  Create Account
                </Link>
              </Typography>
            </form>
          </div>
        </>
      )}
    </>
  );
}
