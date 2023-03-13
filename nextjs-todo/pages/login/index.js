import {
  Typography,
  Box,
  StyledTypography,
  TextField,
  Grid,
  IconButton,
  InputAdornment,
  Input,
  Button,
  Stack,
} from "@mui/material";
import { useState, useEffect } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import styles from "../../styles/Login.module.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Observable } from "rxjs";
var _ = require("lodash");
import { useWatchStateChange } from "../../utilities/useWatch";
import Alert from "@mui/material/Alert";

export default function LoginPage() {
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
    autoFocusUserName: true,
    username: "",
  });

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [hideError, setHideError] = useState(true);

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (event) => {
    console.log("handlePasswordChange", event.target);
  };

  function handleTextChange(event) {
    const targetId = event.target.id;
    const value = event.target.value;
    switch (targetId) {
      case "txtLogin":
        setValues({ ...values, username: value });
        break;
      case "txtPwd":
        setValues({ ...values, password: value });
        break;
      default:
        break;
    }
    let isValidInput = isUserInputValid();
    setValues({ ...values, disableLogin: !isValidInput });
  }

  function isUserInputValid() {
    let result = true;
    if (values.username === "" || values.password === "") {
      console.log(
        `isUserInputValid: ${values.username}\t pwd: ${values.password}`
      );
      result = false;
    }
    return result;
  }

  const handleLoginClicked = (event) => {
    console.log("handleLoginClicked", values);
  };

  useEffect(() => {
    console.log("useEffect values", values);
  });

  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Stack spacing={2}>
          <Typography variant="h2" align="center" sx={{ color: "#00adb5" }}>
            Login
          </Typography>
          <TextField
            id="txtLogin"
            label="Username"
            variant="outlined"
            helperText="Provide your username"
            inputProps={{ autoFocus: values.autoFocusUserName }}
            required={true}
            onChange={(event) => {
              setValues({
                ...values,
                username: event.target.value,
              });
            }}
          />
          <TextField
            id="txtPwd"
            type={values.showPassword ? "text" : "password"}
            label="Password"
            variant="outlined"
            helperText="Please provide your password"
            onChange={(event) => {
              setValues({
                ...values,
                password: event.target.value,
              });
            }}
            required={true}
            InputProps={{
              // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            disabled={!(values.username !== "" && values.password !== "")}
            onClick={handleLoginClicked}
          >
            Log In
          </Button>
          <Alert variant="filled" severity="error">
            This is an error alert — check it out!
          </Alert>
        </Stack>
      </Box>
    </div>
  );
}
