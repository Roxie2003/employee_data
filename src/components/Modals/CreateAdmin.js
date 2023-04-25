import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function CreateAdmin({ admin, onFieldChange }) {
  return (
    <Box component="form" noValidate autoComplete="off">
      <h3 className="m-1 p-2 bg-[#5cb85c] rounded-lg text-white font-bold">
        Admin Details
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
            value={admin.name}
            variant="standard"
            onChange={onFieldChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={2} sm={6} md={6}>
          <TextField
            required
            id="email"
            label="Email"
            value={admin.email}
            variant="standard"
            onChange={onFieldChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={2} sm={6} md={12}>
          <TextField
            required
            id="password"
            label="Password"
            value={admin.password}
            variant="standard"
            onChange={onFieldChange}
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default CreateAdmin;
