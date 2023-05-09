import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Checkbox,
  TextField,
  FormControlLabel,
  Grid,
  Typography,
} from "@material-ui/core";
import HomePage from "../../Pages/HomePage";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./LoginFromStyle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useSelector, useDispatch } from "react-redux";
import { clearError, createUser } from "../../action/userAction";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import Loader from "../utiils/Loader";

function SignupForm() {
  const dispatch = useDispatch();
  const history = useHistory();
const alert  = useAlert();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [avatar, setAvatar] = useState("");

  const [avatarPreview, setAvatarPreview] = useState("");

  const { error, isAuthenticated, loading } = useSelector(
    (state) => state.UserData
  );
  // <<<<< form handlers >>>>>>>
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setconfirmPassword(event.target.value);
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(
      newEmail !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
    );
  };

  const handleAvatarChange = (e) => {

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
     
      };
    }
  };

  const isSignInDisabled = !(
    email &&
    password &&
    isValidEmail &&
    confirmPassword &&
    name
  );
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(password ===confirmPassword);
 if(password !==confirmPassword){
  alert.error("Confirm Password & Password Does'nt match")
  return;
 }


    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("password", password);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
 
    dispatch(createUser(myForm));
  };

  useEffect(() => {
 
    if (error) {
       alert.error(error)
      dispatch(clearError());
    }
    if (isAuthenticated) {
         alert.success("Welcome to ChatMind !");
      history.push("/chat");
    }
  }, [alert ,error, isAuthenticated, history, loading, dispatch]);
 
  return (
    <>
      {loading? (
        <Loader />
      ) : (
        <>
           <HomePage/>
          <div className={classes.formContainer}>
            <form className={classes.form} onSubmit={handleFormSubmit}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                variant="h5"
                component="h1"
                className={classes.heading}
              >
                Sign in to Your Account
              </Typography>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                className={`${classes.nameInput} ${classes.textField}`}
                value={name}
                onChange={handleNameChange}
              />

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
              <TextField
                label="Confirm Password"
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
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />

              <div className={classes.root}>
                <Avatar
                  alt="Avatar Preview"
                  src={avatarPreview}
                  className={classes.avatar2}
                />
                <input
                  accept="image/*"
                  className={classes.input}
                  id="avatar-input"
                  type="file"
                  onChange={handleAvatarChange}
                />
                <label htmlFor="avatar-input">
                  <Button
                    variant="contained"
                    color="default"
                    startIcon={<CloudUploadIcon style={{ color: "#FFFFFF" }} />}
                    component="span"
                    className={classes.button}
                  >
                    <Typography variant="subtitle1">Upload Avatar</Typography>
                  </Button>
                </label>
              </div>

              <Grid
                container
                className={classes.gridcheckbox}
                justify="flex-start"
              >
                <Grid item>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="I Accept The Cricket Weapon Terms & Conditions"
                    className={classes.checkbox}
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="I Accept The Cricket Weapon Terms Of Use"
                    className={classes.checkbox}
                  />
                </Grid>
              </Grid>

              <Typography
                variant="body2"
                className={classes.termsAndConditionsText}
              >
                I acknowledge Cricket Weapon will use my information in
                accordance with its
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
                Create Account
              </Button>
              <Typography
                variant="body1"
                align="center"
                style={{ marginTop: "1rem" }}
              >
                Already have an account?
                <Link to="/login" className={classes.createAccount}>
                  Login
                </Link>
              </Typography>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default SignupForm;
