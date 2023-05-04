import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import WifiIcon from "@material-ui/icons/Wifi";

const useStyles = makeStyles((theme) => ({
  loader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    "& svg": {
      width: 60,
      height: 60,
      animation: "$animateWave 1.5s ease-in-out infinite",
    },
  },
 
  "@keyframes animateWave": {
    "0%": {
      transform: "translateY(0px)",
    },
    "50%": {
      transform: "translateY(-8px)",
    },
    "100%": {
      transform: "translateY(0px)",
    },
  },
}));

function Loader() {
  const classes = useStyles();

  return (
    <div className={classes.loader}>
      <WifiIcon />
    </div>
  );
}

export default Loader;
