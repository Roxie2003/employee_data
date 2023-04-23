import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocalContext } from "../Auth/Context";

export default function AddAdmin() {
  const navigate = useNavigate();
  const [user, setUser] = useContext(LocalContext);
  const [newAdmin, setNewAdmin] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    try {
      if (!user.admin) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleChange = (e) => {
    setNewAdmin({
      ...newAdmin,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://employee-data-api.onrender.com/api/admin/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",

      // Fields that to be updated are passed
      body: JSON.stringify(newAdmin),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        toast.success("Admin Created Sucessfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.errors(err, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="flex justify-center mt-8">
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
      <Box
        component="form"
        noValidate
        autoComplete="off"
        maxWidth="lg"
        className=""
      >
        <h3 className="m-1 p-2 bg-[#5cb85c] rounded-lg text-white font-bold">
          New Admin
        </h3>
        <Grid
          container
          padding={3}
          spacing={4}
          columns={{ xs: 2, sm: 6, md: 12 }}
        >
          <Grid item xs={2} sm={6} md={12}>
            <TextField
              required
              id="name"
              label="Name"
              value={newAdmin.name}
              variant="standard"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={2} sm={6} md={12}>
            <TextField
              required
              id="email"
              label="Email"
              value={newAdmin.email}
              variant="standard"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={2} sm={6} md={12}>
            <TextField
              required
              id="password"
              label="Password"
              value={newAdmin.password}
              variant="standard"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
        <div className="flex justify-center my-2">
          <Button variant="contained" onClick={handleSubmit}>
            Save changes
          </Button>
        </div>
      </Box>
    </div>
  );
}
