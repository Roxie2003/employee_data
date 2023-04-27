//Generates Month Year wise Salary slips
import * as React from "react";
import { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
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
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "react-toastify/dist/ReactToastify.css";
import { LocalContext } from "../Auth/Context";
import EditSalarySlip from "./EditSalarySlip";
import CircularProgress from "@mui/material/CircularProgress";

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
    disablePadding: true,
    label: "Employee Name",
  },
  {
    id: "base_salary",
    numeric: false,
    disablePadding: false,
    label: "Base Salary",
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
    id: "date_of_joining",
    numeric: false,
    disablePadding: false,
    label: "Date of Joining",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
];

function GenerateSalarySlipHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: "700" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

GenerateSalarySlipHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function GenerateSalarySlipToolbar(props) {
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
          sx={{ flex: "1 1 100%", fontWeight: 700 }}
          variant="h5"
          id="tableTitle"
          component="div"
        >
          Employees
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

GenerateSalarySlipToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function GenerateSalarySlip() {
  const [rows, setRows] = useState([]);
  const [user, setUser] = useContext(LocalContext);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [allEmployee, setAllEmployee] = useState([]);
  const [employeeForSlip, setEmployeeForSlip] = useState({});
  const [openEditPaySlipModal, setOpenEditPaySlipModal] = useState(false);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const range = (min, max) =>
    [...Array(max - min + 1).keys()].map((i) => i + min);
  const years = range(2022, new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() - 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (!user.admin) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
    async function fetchData() {
      let URL = `https://employee-data-api.onrender.com/api/employees`;
      let data = await fetch(URL);
      let parsedData = await data.json();
      await setAllEmployee(
        parsedData.data.reverse().map((item) => {
          return createData(
            item.name,
            item.base_salary,
            item.designation,
            item.location,
            item.date_of_joining,
            item
          );
        })
      );
      setLoading(false);
    }
    fetchData();
    //eslint-disable-next-line
  }, []);

  function createData(
    name,
    base_salary,
    designation,
    location,
    date_of_joining,
    actionObject
  ) {
    return {
      name,
      base_salary,
      designation,
      location,
      date_of_joining,
      actionObject,
    };
  }

  useEffect(() => {
    setRows([
      ...allEmployee.filter((emp) => {
        let dt = new Date(emp.date_of_joining);
        return (
          dt.getFullYear() < selectedYear ||
          (dt.getMonth() <= selectedMonth && dt.getFullYear() <= selectedYear)
        );
      }),
    ]);
  }, [selectedMonth, selectedYear, allEmployee]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

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

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleGenerateButton = (e, employee) => {
    e.preventDefault();
    if (
      !employee.attendance.filter(
        (att) => att.month_year === months[selectedMonth] + "-" + selectedYear
      )[0]
    ) {
      toast.error("Record not present", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setEmployeeForSlip(employee);
      setOpenEditPaySlipModal(true);
      // await salarySlipExists(employee);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    try {
      if (!user.admin) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
    //eslint-disable-next-line
  }, []);
  return (
    <div className="p-4 md:p-10">
      {openEditPaySlipModal && (
        <div>
          <EditSalarySlip
            employee={employeeForSlip}
            month_year={months[selectedMonth] + "-" + selectedYear}
            onClose={() => setOpenEditPaySlipModal(false)}
            showmodal={openEditPaySlipModal}
          />
        </div>
      )}
      <div>
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

        <Box sx={{ width: "100%" }}>
          <Box
            component="form"
            sx={{
              width: "50%",
              m: "auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Month </InputLabel>
              <Select
                required
                id="month"
                label="Month"
                name="month"
                autoFocus
                value={selectedMonth}
                onChange={(e) => {
                  if (
                    new Date().getFullYear() > selectedYear ||
                    (new Date().getMonth() > e.target.value &&
                      new Date().getFullYear() === selectedYear)
                  )
                    setSelectedMonth(e.target.value);
                }}
              >
                {months.map((month, index) => (
                  <MenuItem value={index} key={month}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                required
                id="year"
                label="Year"
                name="year"
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                }}
              >
                {years.map((year) => (
                  <MenuItem value={year} key={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <GenerateSalarySlipToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <GenerateSalarySlipHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.name}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox"></TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.name}
                          </TableCell>
                          <TableCell>{row.base_salary}</TableCell>
                          <TableCell>{row.designation}</TableCell>
                          <TableCell>{row.location}</TableCell>
                          <TableCell>
                            {new Date(row.date_of_joining).toDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-4 text-xl">
                              <Button
                                variant="contained"
                                color="success"
                                type="none"
                                onClick={(e) =>
                                  handleGenerateButton(e, row.actionObject)
                                }
                              >
                                Generate
                              </Button>
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
            {loading && (
              <div className="flex justify-center mt-5">
                <CircularProgress />
              </div>
            )}
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
