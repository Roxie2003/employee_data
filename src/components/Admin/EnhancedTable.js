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
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import { AiFillEdit } from "react-icons/ai";
import { GrDocumentPdf } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import Modal from "../Modal";
import Month from "../Modals/Month";
import EditEmployee from "../Modals/EditEmployee";
import CreateEmployee from "../Modals/CreateEmployee";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, handleCreateEmployee } = props;

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
        <Tooltip title="Add Employees">
          <Fab color="primary" aria-label="add">
            <AddIcon onClick={() => handleCreateEmployee()} />
          </Fab>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [allEmployee, setAllEmployee] = useState([]);
  const [openEditEmpModal, setOpenEditEmpModal] = useState(false);
  const [openCreateEmpModal, setOpenCreateEmpModal] = useState(false);
  const [openMonthModal, setOpenMonthModal] = useState(false);
  const [rerenderComponent, setRerenderComponent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [employeeForModal, setEmployeeForModal] = useState({
    name: "",
    email: "",
    designation: "",
    location: "",
    base_salary: 0,
    date_of_joining: new Date(),
    bank_details: { acc_no: 0, name: "", IFSC_code: 0 },
  });

  useEffect(() => {
    async function fetchData() {
      let URL = `https://employee-data-api.onrender.com/api/employees`;
      let data = await fetch(URL);
      let parsedData = await data.json();
      await setAllEmployee(parsedData.data.reverse());
      setLoading(false);
    }
    fetchData();

    //eslint-disable-next-line
  }, [rerenderComponent]);

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

  const rows = allEmployee.map((item) => {
    return createData(
      item.name,
      item.base_salary,
      item.designation,
      item.location,
      item.date_of_joining,
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

  const handleEmpChange = (e) => {
    setEmployeeForModal({ ...employeeForModal, [e.target.id]: e.target.value });
  };
  const handleEditEmployee = (employeeObj) => {
    setEmployeeForModal({
      name: "",
      email: "",
      designation: "",
      location: "",
      base_salary: 0,
      date_of_joining: new Date(),
      bank_details: { acc_no: 0, name: "", IFSC_code: 0 },
      ...employeeObj,
    });
    setOpenEditEmpModal(!openEditEmpModal);
  };

  const handleMonthModal = (employeeObj) => {
    setEmployeeForModal(employeeObj);
    setOpenMonthModal(!openMonthModal);
  };

  const handleCreateEmployee = () => {
    setEmployeeForModal({
      name: "",
      email: "",
      designation: "",
      location: "",
      base_salary: 0,
      date_of_joining: new Date(),
      bank_details: { acc_no: 0, name: "", IFSC_code: 0 },
    });
    setOpenCreateEmpModal(!openCreateEmpModal);
  };

  const handleDeleteEmployee = (employeeObj) => {
    fetch(
      "https://employee-data-api.onrender.com/api/employees/" + employeeObj._id,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setAllEmployee(
          allEmployee.filter((emp) => emp._id !== employeeObj._id)
        );
        toast.success("Employee Deleted Sucessfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => console.error(error));
  };

  const handleEditEmployeeSave = (e, employeeObj) => {
    e.preventDefault();
    fetch(
      "https://employee-data-api.onrender.com/api/employees/" + employeeObj._id,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PATCH",

        // Fields that to be updated are passed
        body: JSON.stringify(employeeObj),
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        toast.success("Employee Updated Sucessfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setRerenderComponent(!rerenderComponent);
        closeModal();
      });
  };

  const handleCreateEmployeeNew = (e, employeeObj) => {
    e.preventDefault();
    fetch("https://employee-data-api.onrender.com/api/employees/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",

      // Fields that to be updated are passed
      body: JSON.stringify(employeeObj),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.sucess) {
          toast.success("Employee Created Sucessfully!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setRerenderComponent(!rerenderComponent);
          closeModal();
        } else {
          toast.error(data.error, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.reload(false);
          }, 2000);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const closeModal = () => {
    setEmployeeForModal({});
    setOpenEditEmpModal(false);
    setOpenMonthModal(false);
    setOpenCreateEmpModal(false);
  };
  return (
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
      {openMonthModal && (
        <Modal
          title="Select Month for Salary"
          children={
            <Month
              employee={employeeForModal}
              onClose={closeModal}
              showmodal={openMonthModal}
            />
          }
          onClose={closeModal}
          showmodal={openMonthModal}
          maxWidth="xs"
        />
      )}
      {openEditEmpModal && (
        <Modal
          title="Edit Employee Info"
          endTitle="Save Changes"
          handleSubmit={(e) => handleEditEmployeeSave(e, employeeForModal)}
          children={
            <EditEmployee
              employee={employeeForModal}
              onFieldChange={handleEmpChange}
            />
          }
          onClose={closeModal}
          showmodal={openEditEmpModal}
          hasfooter={"true"}
        />
      )}
      {openCreateEmpModal && (
        <Modal
          title="Create New Employee"
          endTitle="Create Employee"
          handleSubmit={(e) => handleCreateEmployeeNew(e, employeeForModal)}
          children={
            <CreateEmployee
              employee={employeeForModal}
              onFieldChange={handleEmpChange}
            />
          }
          onClose={closeModal}
          showmodal={openCreateEmpModal}
          hasfooter={"true"}
        />
      )}

      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            handleCreateEmployee={handleCreateEmployee}
          />
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
                            <AiFillEdit
                              onClick={() =>
                                handleEditEmployee(row.actionObject)
                              }
                              className="cursor-pointer"
                            />
                            <MdDeleteForever
                              className="cursor-pointer"
                              onClick={() =>
                                window.confirm(
                                  "Do you want to delete this employee?"
                                ) === true
                                  ? handleDeleteEmployee(row.actionObject)
                                  : ""
                              }
                            />
                            <GrDocumentPdf
                              className="cursor-pointer"
                              onClick={() => handleMonthModal(row.actionObject)}
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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          />
        </Box>
      </Box>
    </div>
  );
}
