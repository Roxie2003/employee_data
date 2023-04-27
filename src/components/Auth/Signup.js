import * as React from "react";
import { useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
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

export default function Signup() {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [user, setUser] = useContext(LocalContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gAuthUser, setGAuthUser] = useState(null);

  const handleCallbackResponse = (response) => {
    let userObject = jwt_decode(response.credential);
    setGAuthUser(userObject);

    try {
      fetch("https://employee-data-api.onrender.com/api/employees/gauth", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",

        // Fields that to be updated are passed
        body: JSON.stringify({
          name: userObject.name,
          email: userObject.email,
        }),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.sucess) {
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
  }, [gAuthUser]);

  const handleChange = (e) => {
    if (e.target.name === "firstName") {
      setFirstName(e.target.value);
    } else if (e.target.name === "lastName") {
      setLastName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      fetch("https://employee-data-api.onrender.com/api/employees/", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",

        // Fields that to be updated are passed
        body: JSON.stringify({
          name: firstName + " " + lastName,
          email,
          password,
        }),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.sucess) {
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
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  value={firstName}
                  onChange={handleChange}
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  value={lastName}
                  onChange={handleChange}
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  value={email}
                  onChange={handleChange}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" className="text-blue-400" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>

            <div className="my-6 flex items-center">
              <div className="flex-grow bg bg-gray-300 h-0.5"></div>
              <div className="flex-grow-0 mx-5">or continue with Google</div>
              <div className="flex-grow bg bg-gray-300 h-0.5"></div>
            </div>

            <center>
              <div id="googleAuthDiv" className="w-[80vw] md:w-[20vw]"></div>
            </center>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
