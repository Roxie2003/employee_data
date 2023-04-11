import * as React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";

import { GrView } from "react-icons/gr";

import { MdDeleteForever } from "react-icons/md";

import Invoice from "./Modals/Invoice";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Employee Name",
  },
  {
    id: "total_salary",
    numeric: false,
    disablePadding: false,
    label: "Total Salary",
  },
  {
    id: "designation",
    numeric: false,
    disablePadding: false,
    label: "Designation",
  },
  {
    id: "location",
    numeric: false,
    disablePadding: false,
    label: "Location",
  },
  {
    id: "attendance.month_year",
    numeric: false,
    disablePadding: false,
    label: "Salary Slip Month",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            <TableSortLabel active={orderBy === headCell.id}>
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Payslip
        </Typography>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function SalarySlipTable() {
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [allEmployee, setAllEmployee] = useState([]);
  const [showSalarySlip, setShowSalarySlip] = useState(false);
  const [employeeForModal, setEmployeeForModal] = useState({});
  const [salarySlipDetails, setSalarySlipDetails] = useState({});

  useEffect(() => {
    async function fetchData() {
      let URL = `https://employee-data-api.onrender.com/api/salarySlips/`;
      let data = await fetch(URL);
      let parsedData = await data.json();
      setAllEmployee(parsedData.data);
    }
    fetchData();
    //eslint-disable-next-line
  }, []);

  function createData(
    name,
    total_salary,
    designation,
    location,
    month_year,
    actionObject
  ) {
    return {
      name,
      total_salary,
      designation,
      location,
      attendance: { month_year },
      actionObject,
    };
  }

  const rows = allEmployee.map((item) => {
    return createData(
      item.name,
      item.total_salary,
      item.designation,
      item.location,
      item.attendance.month_year,
      item
    );
  });

  //   const handleClick = (event, name) => {
  //     const selectedIndex = selected.indexOf(name);
  //     let newSelected = [];

  //     if (selectedIndex === -1) {
  //       newSelected = newSelected.concat(selected, name);
  //     } else if (selectedIndex === 0) {
  //       newSelected = newSelected.concat(selected.slice(1));
  //     } else if (selectedIndex === selected.length - 1) {
  //       newSelected = newSelected.concat(selected.slice(0, -1));
  //     } else if (selectedIndex > 0) {
  //       newSelected = newSelected.concat(
  //         selected.slice(0, selectedIndex),
  //         selected.slice(selectedIndex + 1)
  //       );
  //     }

  //     setSelected(newSelected);
  //   };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleDeleteSalarySlip = (salarySlipId) => {
    if (window.confirm("Do you want to delete this salary Slip?") === true) {
      fetch(
        "https://employee-data-api.onrender.com/api/salarySlips/" +
          salarySlipId,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          //window.location.reload(true);
        })
        .catch((error) => console.error(error));
    }
  };
  return (
    <div className="p-4 md:p-10">
      <div>
        <div>
          {showSalarySlip && salarySlipDetails && (
            <Invoice
              salarySlipDetails={salarySlipDetails}
              handleOnClose={() => {
                setShowSalarySlip(false);
              }}
            ></Invoice>
          )}
        </div>

        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  rowCount={rows.length}
                />
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          //onClick={(event) => handleClick(event, row.name)}
                          tabIndex={-1}
                          key={row.actionObject._id}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            padding="normal"
                          >
                            {row.name}
                          </TableCell>
                          <TableCell>{row.total_salary}</TableCell>
                          <TableCell>{row.designation}</TableCell>
                          <TableCell>{row.location}</TableCell>
                          <TableCell>{row.attendance.month_year}</TableCell>
                          <TableCell>
                            <div className="flex space-x-4 text-xl">
                              <GrView
                                className="cursor-pointer"
                                title="View Payslip"
                                onClick={() => {
                                  setSalarySlipDetails(row.actionObject);
                                  setShowSalarySlip(true);
                                }}
                              />
                              <MdDeleteForever
                                className="cursor-pointer"
                                title="Delete Payslip"
                                onClick={() =>
                                  handleDeleteSalarySlip(row.actionObject._id)
                                }
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          />
        </Box>
      </div>
    </div>
  );
}
