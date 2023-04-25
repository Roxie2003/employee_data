import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

function Month({ employee }) {
  return (
    <Box sx={{}}>
      <Grid container padding={1} columns={{ xs: 6, sm: 12, md: 12 }}>
        {employee["attendance"] && employee["attendance"].map((att, index) => (
          <Grid
            item
            xs={2}
            sm={3}
            md={3}
            key={index}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              component={Link}
              to="/paySlip"
              state={{ employee, month_year: att.month_year }}
              variant="outlined"
              sx={{ my: 0.8, p: 1 }}
            >
              {att.month_year}
            </Button>
          </Grid>
        ))}
        {
          !(employee["attendance"]) &&
          <span>No Record to show Please Create New Salary Slip</span>
        }
      </Grid>
    </Box>
  );
}

export default Month;
