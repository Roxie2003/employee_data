import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import EditSalarySlip from "../Admin/EditSalarySlip";

function Month({ employee, onClose, showmodal }) {
  const [openEditPaySlipModal, setOpenEditPaySlipModal] = useState(false);
  const [selectedMonthYear, setSelectedMonthYear] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectedMonthYear(e.target.getAttribute("month_year"));
    setOpenEditPaySlipModal(true);
  };

  const handleClose = () => {
    setOpenEditPaySlipModal(false);
  };

  return (
    <Box sx={{}}>
      {openEditPaySlipModal && (
        <div>
          <EditSalarySlip
            employee={employee}
            month_year={selectedMonthYear}
            onClose={() => setOpenEditPaySlipModal(false)}
            showmodal="true"
          />
        </div>
      )}
      <Grid container padding={1} columns={{ xs: 6, sm: 12, md: 12 }}>
        {employee["attendance"] &&
          employee["attendance"].map((att, index) => (
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
                employee={employee}
                month_year={att.month_year}
                variant="outlined"
                sx={{ my: 0.8, p: 1 }}
                onClick={(e) => handleSubmit(e)}
              >
                {att.month_year}
              </Button>
            </Grid>
          ))}
        {!employee["attendance"] && (
          <span>No Record to show Please Create New Salary Slip</span>
        )}
      </Grid>
    </Box>
  );
}

export default Month;
