import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocalContext } from "../Auth/Context";
import { useFormik } from 'formik';
import { resetPasswordSchema } from "../../schemas";

export default function UserPassword() {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [user, setUser] = useContext(LocalContext);
  const [employeePasses, setEmployeePasses] = useState({
    id: "",
    name: "",
    email: "",
  });
  const initialValues = {
    current_password: "",
    new_password: "",
    confirm_password: "",
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => {
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
          body: JSON.stringify(values),
        }
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          toast.success("Password Updated Sucessfully!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        });
    }
  })


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
          autoComplete="off"
          maxWidth="lg"
          className=""
          onSubmit={handleSubmit}
        >
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
                id="current_password"
                label="Current Password"
                value={values.current_password}
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
              />
              {errors.current_password && touched.current_password ? (<p className="text-red-600 text-sm">{errors.current_password}</p>) : null}
            </Grid>
            <Grid item xs={2} sm={6} md={12}>
              <TextField
                id="new_password"
                label="New Password"
                value={values.new_password}
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
              />
              {errors.new_password && touched.new_password ? (<p className="text-red-600 text-sm">{errors.new_password}</p>) : null}
            </Grid>
            <Grid item xs={2} sm={6} md={12}>
              <TextField
                id="confirm_password"
                label="Confirm Password"
                value={values.confirm_password}
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
              />
              {errors.confirm_password && touched.confirm_password ? (<p className="text-red-600 text-sm">{errors.confirm_password}</p>) : null}
            </Grid>
          </Grid>

          <div className="flex justify-center my-2">
            <Button variant="contained" type="submit">
              Save changes
            </Button>
          </div>
        </Box>
      </div>
    );
  }