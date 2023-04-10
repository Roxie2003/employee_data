import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

function Month({ employee }) {
  return (
    <Box sx={{}}>
      <Grid container padding={1} columns={{ xs: 6, sm: 12, md: 12 }}>
        {employee["attendance"].map((att, index) => (
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
            <Link
              to="/paySlip"
              state={{ employee, month_year: att.month_year }}
              variant="outlined"
              sx={{ my: 0.8, p: 1 }}
            >
              {att.month_year}
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Month;
