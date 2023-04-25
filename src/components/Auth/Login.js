import * as React from "react";
import { useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";

import { LocalContext } from "./Context";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="https://weoto.in/">
        Weoto Technologies Private Limited
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line
  const [gAuthUser, setGAuthUser] = useState(null);
  const [user, setUser] = useContext(LocalContext);

  useEffect(() => {
    try {
      if (user.admin || user.employee) {
        if (user.admin) navigate("/dashboard");
        else if (user.employee) navigate("/");
      }
    } catch (error) {
      // console.error(error);
    }
    // eslint-disable-next-line
  }, []);
  const handleChange = (e) => {
    if (e.target.name === "loginType") {
      setLoginType(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handelGAuth = (userObject) => {
    try {
      fetch(
        `https://employee-data-api.onrender.com/api/${loginType}/login/gauth/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",

          // Fields that to be updated are passed
          body: JSON.stringify({
            email: userObject.email,
          }),
        }
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.sucess) {
            if (loginType === "admin") {
              localStorage.setItem(
                "user",
                JSON.stringify({
                  token: data.token,
                  email: data.email,
                  admin: true,
                })
              );
              setUser(JSON.parse(localStorage.getItem("user")));
              navigate("/dashboard");
            } else {
              localStorage.setItem(
                "user",
                JSON.stringify({
                  token: data.token,
                  email: data.email,
                  employee: true,
                })
              );
              setUser(JSON.parse(localStorage.getItem("user")));
              navigate("/");
            }
          } else {
            toast.error(data.error, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCallbackResponse = (response) => {
    if (loginType.length > 0) {
      let userObject = jwt_decode(response.credential);
      setGAuthUser(userObject);
      handelGAuth(userObject);
    } else {
      toast.error("Please Select Login type", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    // / * global google */
    //eslint-disable-next-line
    google.accounts.id.initialize({
      client_id:
        "289036486479-pplpa2filjtri6v1efqn7s51818l0nls.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    //eslint-disable-next-line
    google.accounts.id.renderButton(document.getElementById("googleAuthDiv"), {
      theme: "outline",
      size: "large",
    });

    //eslint-disable-next-line
    google.accounts.id.prompt();

    //eslint-disable-next-line
  }, [loginType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      fetch(`https://employee-data-api.onrender.com/api/${loginType}/login`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",

        // Fields that to be updated are passed
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.sucess) {
            if (loginType === "admin") {
              localStorage.setItem(
                "user",
                JSON.stringify({
                  token: data.token,
                  email: data.email,
                  admin: true,
                })
              );
              setUser(JSON.parse(localStorage.getItem("user")));
              navigate("/dashboard");
            } else {
              localStorage.setItem(
                "user",
                JSON.stringify({
                  token: data.token,
                  email: data.email,
                  employee: true,
                })
              );
              setUser(JSON.parse(localStorage.getItem("user")));
              navigate("/");
            }
          } else {
            toast.error(data.error, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <img src="./logo.png" alt="logo" height="150px" width="150px" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <InputLabel id="demo-simple-select-label">Login Type</InputLabel>
            <Select
              required
              fullWidth
              id="loginType"
              label="Login Type"
              name="loginType"
              autoFocus
              value={loginType}
              onChange={handleChange}
            >
              <MenuItem value={"admin"}>Admin</MenuItem>
              <MenuItem value={"employees"}>Employee</MenuItem>
            </Select>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#" className="text-blue-400" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" className="text-blue-400" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <div className="my-6 flex items-center">
          <div className="flex-grow bg bg-gray-300 h-0.5"></div>
          <div className="flex-grow-0 mx-5">or continue with Google</div>
          <div className="flex-grow bg bg-gray-300 h-0.5"></div>
        </div>

        <center>
          <div id="googleAuthDiv" className="w-[80vw] md:w-[20vw]"></div>
        </center>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
