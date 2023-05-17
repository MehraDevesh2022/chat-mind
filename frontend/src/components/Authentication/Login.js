import React, { useState } from "react";
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
import HomePage from "../../Pages/Homepage";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory , Link } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import Loader from "../layouts/Loader";
const Login = () => {
 const classes = useStyles();
 const [showPassword, setShowPassword] = useState(false);
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [isValidEmail, setIsValidEmail] = useState(true);
  // const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();
const { isAuth ,setIsAuth } = ChatState();
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

 const isSignInDisabled = !(email && password && isValidEmail);

  const submitHandler = async () => {
 setIsAuth(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      // setLoading(false);
      return;
    }

    // console.log(email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

   
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
         setTimeout(() => {
        setIsAuth(false);
        history.push("/chats");
         }, 2000);
      
    } catch (error) {
       setIsAuth(false);
      toast({
        title: "Error Occured!",
        description: error.response.statusText,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
        
      });
      // setLoading(false);
    }
  };

 
  return (
    <>
      <HomePage />
      {isAuth ? (
        <Loader />
      ) : (
        <div className={classes.formContainer}>
          <form className={classes.form}>
            <Avatar className={classes.avatar}>
              <LockOpenIcon />
            </Avatar>
            <Typography variant="h5" component="h1" className={classes.heading}>
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
                  control={<Checkbox color="primary" />}
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
              I accept the ChatMind Terms of Use and acknowledge ChatMind will
              use my information in accordance with its
              <Link to="#" className={classes.privacyText}>
                Privacy Policy.
              </Link>
            </Typography>
            <Button
              variant="contained"
              className={classes.loginButton}
              fullWidth
              disabled={isSignInDisabled}
              onClick={submitHandler}
            >
              Sign in
            </Button>
            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: "1rem" }}
            >
              Don't have an account?
              <Link to="/signup" className={classes.createAccount}>
                Create Account
              </Link>
            </Typography>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
