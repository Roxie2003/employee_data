import * as React from "react";
import { useEffect, useState, useContext } from "react";
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
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { GrView } from "react-icons/gr";
import Invoice from "../Modals/Invoice";
import { useNavigate } from "react-router-dom";
import { LocalContext } from "../Auth/Context";

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
    id: "month_year",
    numeric: false,
    disablePadding: false,
    label: "Month-Year",
  },
  {
    id: "base_salary",
    numeric: false,
    disablePadding: false,
    label: "Base Salary",
  },
  {
    id: "present_days",
    numeric: false,
    disablePadding: false,
    label: "Present Days",
  },
  {
    id: "overtime_pay",
    numeric: false,
    disablePadding: false,
    label: "Overtime Pay",
  },
  {
    id: "income_tax",
    numeric: false,
    disablePadding: false,
    label: "Income Tax",
  },
  {
    id: "total_salary",
    numeric: false,
    disablePadding: false,
    label: "Total Salary",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
];

function EnhancedTableHead(props) {
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
            sx={{ fontWeight: '700' }}
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

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
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
          sx={{ flex: "1 1 100%", fontWeight: 700 }}
          variant="h5"
          id="tableTitle"
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
          Salary Slip
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

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function UserDashboard() {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [user, setUser] = useContext(LocalContext);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [allEmployee, setAllEmployee] = useState([]);
  const [showSalarySlip, setShowSalarySlip] = useState(false);
  const [salarySlipDetails, setSalarySlipDetails] = useState({});

  useEffect(() => {
    try {
      if (!user.employee) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }

    async function fetchData() {
      let URL = `https://employee-data-api.onrender.com/api/salarySlips/email/${user.email}`;
      let data = await fetch(URL);
      let parsedData = await data.json();
      setAllEmployee(parsedData.data);
    }
    fetchData();
    //eslint-disable-next-line
  }, []);

  function createData(
    name,
    month_year,
    base_salary,
    present_days,
    overtime_pay,
    income_tax,
    total_salary,
    actionObject
  ) {
    return {
      name,
      attendance: { month_year },
      base_salary,
      attendance1: { present_days },
      overtime_pay,
      income_tax,
      total_salary,
      actionObject,
    };
  }

  const rows = allEmployee.map((item) => {
    return createData(
      item.name,
      item.attendance.month_year,
      item.base_salary,
      item.attendance.present_days,
      item.overtime_pay,
      item.income_tax,
      item.total_salary,
      item
    );
  });

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

  return (
    <div className="p-4 md:p-10">
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
                        key={row.actionObject._id}
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
                        <TableCell>{row.attendance.month_year}</TableCell>
                        <TableCell>{row.base_salary}</TableCell>
                        <TableCell>{row.attendance1.present_days}</TableCell>
                        <TableCell>{row.overtime_pay}</TableCell>
                        <TableCell>{row.income_tax}</TableCell>
                        <TableCell>{row.total_salary}</TableCell>
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
  );
}
