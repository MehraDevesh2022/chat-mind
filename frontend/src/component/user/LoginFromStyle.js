import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3rem",
    height: "auto",
  },
  form: {
    width: "350px",
    margin: "auto",
    borderRadius: "5px",
      alignContent : "center",
    padding: "2rem",
    
  },

  heading: {
    textAlign: "center",
    marginBottom: theme.spacing(3),
    color: "#F2F2F5",
    fontWeight: 800,
  },
  nameInput: {
    position: "relative",
    "& > label": {
      left: ".2rem",
    },
    padding: "4px 0px",
    fontSize: "1rem",
    width: "100%",
    marginBottom: theme.spacing(5),
    height: ".7rem",
  },
  emailInput: {
    position: "relative",
    "& > label": {
      left: ".2rem",
    },
    padding: "4px 0px",
    fontSize: "1rem",
    width: "100%",
    marginTop: theme.spacing(3),
    height: ".7rem",
  },
  passwordInput: {
    position: "relative",
    "& > label": {
      left: ".2rem",
    },
    padding: "4px 0px",
    width: "100%",
    height: ".7rem",
    marginTop: theme.spacing(8),
    "&.MuiOutlinedInput-input": {
      padding: "14px 14px",
    },
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  strengthIndicator: {
    marginTop: theme.spacing(1),
  },

  showPasswordButton: {
    position: "absolute",
    top: "50%",
    color: "#004FC4",
    fontSize: "12px",
    right: theme.spacing(2),
    transform: "translateY(-50%)",
    border: "none",
    "&:hover": {
      color: "#6600CC",
      background: "none",
    },
  },
  rememberMeContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "14px",
    marginTop: theme.spacing(7),
    "& .MuiIconButton-label": {
      color: "#004FC4",
    },
  },
  forgotPasswordLink: {
    color: "#004FC4",
    textDecoration: "none",
    fontWeight: 600,
    "&:hover": {
      textDecoration: "underline",
      color: "#6600CC",
    },
  },
  termsAndConditionsText: {
    fontFamily: "Roboto",
    color: "#E4E4EB",
    textAlign: "center",
    lineHeight: "17px",
    paddingLeft: "4px",
    marginTop: theme.spacing(2),
    fontSize: "14px",
  },
  loginButton: {
    color: "#fff",
    backgroundColor: "#004FC4",
    border: "2px solid #004FC4",
    margin: `${theme.spacing(3)}px 0`,
    marginTop: "1rem",
    "&:disabled": {
      backgroundColor: "#3E7BFA", // faded black
      color: "#E4E4EB",
      borderColor: "#3E7BFA",
    },
    "&:hover": {
      backgroundColor: "#6600CC",
      borderColor: "#6600CC",
    },
  },
  privacyText: {
    marginLeft: "4px",
    textDecoration: "underline",
    color: "#004FC4",
    fontSize: "14px",
    "&:hover": {
      color: "#6600CC",
    },
  },
  createAccount: {
    fontSize: "1rem",
    fontWeight: 500,
    color: "#004FC4",
    paddingLeft: "6px",
    "&:hover": {
      color: "#6600CC",
      textDecoration: "underline",
    },
  },
  // input text Filed
  textField: {
    "& .MuiOutlinedInput-adornedEnd": {
      paddingRight: theme.spacing(0),
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "#EBEBF0",
      padding: "12px 14px",
    },
    "& .MuiInputLabel-root": {
      color: "#8F90A6",
      fontSize: "16px",
      textAlign: "center",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#EBEBF0",
      fontSize: "14px",
      textAlign: "center",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#004FC4",
        color: "#004FC4",
      },
      "& .MuiOutlinedInput-input": {
        padding: "13px 8px",
        backgroundColor: "#55577052",
        borderRadius: "5px",
      },
      "& .Mui-focused fieldset": {
        borderColor: "#6600CC",
        color: "#6600CC",
        outline: "none",
      },
    },
  },

  // signUp

  avatar: {
    margin: " 8px auto",
    backgroundColor: "#004FC4",
  },
  gridcheckbox: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "3rem",
  },
  checkbox: {
    "& .MuiTypography-body1": {
      fontSize: "13px",
    },
    marginTop: theme.spacing(1),
    "& .MuiIconButton-label": {
      color: "#004FC4",
    },
  },

  // image uploader
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "3.5rem",
  },
  avatar2: {
    marginLeft: "6px",
    backgroundColor: "#004FC4",
    "&.MuiAvatar-colorDefault": {
      color: "#F2F2F5",
      backgroundColor: "#004FC4",
    },
    "&:hover": {
      backgroundColor: "#6600CC",
    },
  },
  input: {
    display: "none",
  },
  button: {
    color: "white",
    backgroundColor: "#004FC4",
    "&:hover": {
      backgroundColor: "#6600CC",
    },
  },
}));

export default useStyles;
