import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocalContext } from "../Auth/Context";
export default function UserPassword() {
  const navigate = useNavigate();
  const [user, setUser] = useContext(LocalContext);
  const [employeePasses, setEmployeePasses] = useState({
    id: "",
    name: "",
    email: "",
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  useEffect(() => {
    try {
      if (!user.employee) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }

    fetch(
      `https://employee-data-api.onrender.com/api/employees/email/${user.email}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setEmployeePasses({
          ...employeePasses,
          _id: data.data._id,
        });
      });

    //eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setEmployeePasses({
      ...employeePasses,
      [e.target.id]: e.target.value,
    });
    console.log(employeePasses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      "https://employee-data-api.onrender.com/api/employees/changePassword/" +
        employeePasses._id,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PATCH",

        // Fields that to be updated are passed
        body: JSON.stringify(employeePasses),
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        toast.success("Password Updated Sucessfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/");
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
        {}
        <h3 className="m-1 p-2 bg-[#5cb85c] rounded-lg text-white font-bold">
          Change Password
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
              id="current_password"
              label="Current Password"
              value={employeePasses.current_password}
              variant="standard"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={2} sm={6} md={12}>
            <TextField
              required
              id="new_password"
              label="New Password"
              value={employeePasses.new_password}
              variant="standard"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={2} sm={6} md={12}>
            <TextField
              required
              id="confirm_password"
              label="Confirm Password"
              value={employeePasses.confirm_password}
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
