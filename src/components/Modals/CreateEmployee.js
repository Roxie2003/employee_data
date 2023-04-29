import React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function CreateEmployee({ employee, onFieldChange }) {
  const onBankFieldChange = (e) => {
    onFieldChange({
      target: {
        id: "bank_details",
        value: { ...employee.bank_details, [e.target.id]: e.target.value },
      },
    });
  };

  const onDateFieldChange = (e) => {
    onFieldChange({
      target: {
        id: "date_of_joining",
        value: dayjs(e),
      },
    });
  };
  return (
    <Box component="div">
      <h3 className="m-1 p-2 bg-[#5cb85c] rounded-lg text-white font-bold">
        Employee Details
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
            type="email"
            id="email"
            label="Email"
            value={employee.email}
            variant="standard"
            onChange={onFieldChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={2} sm={6} md={6}>
          <TextField
            required
            id="name"
            label="Name"
            value={employee.name}
            variant="standard"
            onChange={onFieldChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={2} sm={6} md={6}>
          <TextField
            required
            id="base_salary"
            label="Base Salary"
            value={employee.base_salary}
            variant="standard"
            onChange={onFieldChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={2} sm={6} md={6}>
          <TextField
            required
            id="designation"
            label="Designation"
            value={employee.designation}
            variant="standard"
            onChange={onFieldChange}
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
            onChange={onFieldChange}
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
    </Box>
  );
}

export default CreateEmployee;
