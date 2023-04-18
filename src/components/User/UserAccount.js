import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserAccount() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [employee, setEmployee] = useState({
    id: "",
    name: "",
    email: "",
    location: "",
    designation: "",
    date_of_joining: "",
    base_salary: "",
    bank_details: {
      acc_no: "",
      name: "",
      IFSC_code: ""
    },
  });

  useEffect(() => {
    let localUser = JSON.parse(localStorage.getItem('user')) 
    setUser(localUser)
    try {
      if (!localUser) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error)
    }

    fetch(`https://employee-data-api.onrender.com/api/employees/email/${localUser.email}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      setEmployee({
        ...employee,
        ...data.data
      })
    });

    //eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.id]: e.target.value,
    })
  };

  const onBankFieldChange = (e) => {
    handleChange({
      target: {
        id: "bank_details",
        value: { ...employee.bank_details, [e.target.id]: e.target.value },
      },
    });
  };

  const onDateFieldChange = (e) => {
    handleChange({
      target: {
        id: "date_of_joining",
        value: dayjs(e),
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(
      "https://employee-data-api.onrender.com/api/employees/" + employee._id,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PATCH",

        // Fields that to be updated are passed
        body: JSON.stringify(employee),
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        toast.success('Details Updated Sucessfully!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

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
      <Box component="form" noValidate autoComplete="off" maxWidth="lg" className="">
        <h3 className="m-1 p-2 bg-[#5cb85c] rounded-lg text-white font-bold">
          My Account - Personal Details
        </h3>
        <Grid
          container
          padding={3}
          spacing={4}
          columns={{ xs: 2, sm: 6, md: 12 }}
        >
          <Grid item xs={2} sm={6} md={6}>
            <TextField
              required
              id="name"
              label="Name"
              value={employee.name}
              variant="standard"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={2} sm={6} md={6}>
            <TextField
              required
              id="email"
              label="Email"
              value={employee.email}
              variant="standard"
              onChange={handleChange}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={2} sm={6} md={6}>
            <TextField
              required
              id="base_salary"
              label="Base Salary"
              value={employee.base_salary}
              variant="standard"
              onChange={handleChange}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={2} sm={6} md={6}>
            <TextField
              required
              id="designation"
              label="Designation"
              value={employee.designation}
              variant="standard"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={2} sm={6} md={6}>
            <TextField
              required
              id="location"
              label="Location"
              value={employee.location}
              variant="standard"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={2} sm={6} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                id="date_of_joining"
                label="Joining Date"
                value={dayjs(employee.date_of_joining)}
                onChange={onDateFieldChange}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <hr />
        <h3 className="m-1 mt-4 p-2 bg-[#5cb85c] rounded-lg text-white font-bold">
          Bank Details
        </h3>
        <Grid
          container
          padding={3}
          spacing={4}
          columns={{ xs: 2, sm: 6, md: 12 }}
        >
          <Grid item xs={2} sm={6} md={6}>
            <TextField
              required
              id="acc_no"
              label="Account No"
              value={employee.bank_details.acc_no}
              variant="standard"
              onChange={onBankFieldChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={2} sm={6} md={6}>
            <TextField
              required
              id="name"
              label="Bank Name"
              value={employee.bank_details.name}
              variant="standard"
              onChange={onBankFieldChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={2} sm={6} md={6}>
            <TextField
              required
              id="IFSC_code"
              label="IFSC Code"
              value={employee.bank_details.IFSC_code}
              variant="standard"
              onChange={onBankFieldChange}
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
};