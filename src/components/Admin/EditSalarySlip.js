import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Invoice from "../Modals/Invoice";
import { toast } from "react-toastify";
import Modal from "../Modal";

function EditSalarySlip({ employee, month_year, onClose, showmodal }) {
  const [salarySlipDetails, setSalarySlipDetails] = useState({});
  const [showSalarySlip, setShowSalarySlip] = useState(false);
  const salarySlipExists = async (employee) => {
    let URL =
      `https://employee-data-api.onrender.com/api/salarySlips/` +
      employee.id +
      "/" +
      month_year +
      "/";
    let data = await fetch(URL);
    let parsedData = await data.json();
    //check if already generated
    if (parsedData.data) {
      await setSalarySlipDetails(parsedData.data);
      setShowSalarySlip(true);
    } else {
      const employeeObj = await {
        ...employee,
        income_tax: 0,
        attendance: {
          ...employee["attendance"].filter(
            (att) => att.month_year === month_year
          )[0],
        },
      };
      let { id, _id, ...salarySlip } = await employeeObj;
      salarySlip = await {
        ...salarySlip,
        overtime_pay: salarySlip["attendance"].overtime_hrs * 500,
        employee_id: id,
      };
      salarySlip = await {
        ...salarySlip,
        total_salary: salarySlip["base_salary"] ? salarySlip["base_salary"] : 0 + salarySlip["overtime_pay"],
      };
      await setSalarySlipDetails(salarySlip);
    }
  };

  const onFieldChange = (e) => {
    if (e.target.id.includes("attendance."))
      setSalarySlipDetails({
        ...salarySlipDetails,
        attendance: {
          ...salarySlipDetails.attendance,
          [e.target.id.replace("attendance.", "")]: e.target.value,
        },
      });
    else
      setSalarySlipDetails({
        ...salarySlipDetails,
        [e.target.name]: e.target.value,
      });
  };

  const handleCreatePaySlip = (e, salarySlipDetails) => {
    e.preventDefault();
    fetch(
      "https://employee-data-api.onrender.com/api/salarySlips/" +
      salarySlipDetails.employee_id +
      "/",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        // Fields that to be updated are passed
        body: JSON.stringify(salarySlipDetails),
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        toast.success("Salary Slip Generated Sucessfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setSalarySlipDetails(data.data);
        setShowSalarySlip(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    console.log("Hiii");
    salarySlipExists(employee);
    // eslint-disable-next-line
  }, []);

  return (
    <div align="center">
      <div>
        {showSalarySlip && salarySlipDetails && (
            <Invoice
              salarySlipDetails={salarySlipDetails}
              handleOnClose={() => {
                onClose();
              }}
            ></Invoice>
        )}
      </div>
      {!showSalarySlip &&
        salarySlipDetails &&
        salarySlipDetails.bank_details &&
        salarySlipDetails.attendance && (
          <Modal
            title="Edit Salary Slip"
            endTitle="Generate"
            children={
              <div className="w-100 my-0">
                <h1 className="text-2xl font-bold">
                  {salarySlipDetails.name + " : " + month_year}
                </h1>
                <div className="grid grid-cols-2  ">
                  <div className="p-3">
                    <h3 className="my-2 p-2 bg-[#5cb85c] rounded-lg text-white font-bold">
                      Employee Details
                    </h3>
                    <div className="px-3">
                      <TextField
                        required
                        id="name"
                        label="Name"
                        value={salarySlipDetails.name}
                        variant="standard"
                        //onChange={onFieldChange}
                        fullWidth
                      />
                      <TextField
                        required
                        id="designation"
                        label="Designation"
                        value={salarySlipDetails.designation}
                        variant="standard"
                        //onChange={onFieldChange}
                        fullWidth
                      />
                      <TextField
                        required
                        id="location"
                        label="Location"
                        value={salarySlipDetails.location}
                        variant="standard"
                        //onChange={onFieldChange}
                        fullWidth
                      />
                      <TextField
                        required
                        id="joining_date"
                        label="Date of Joining"
                        value={new Date(
                          salarySlipDetails.date_of_joining
                        ).toUTCString()}
                        variant="standard"
                        //onChange={onFieldChange}
                        fullWidth
                      />
                    </div>
                  </div>

                  <div className=" p-3">
                    <h3 className="my-2 p-2 bg-[#5cb85c] rounded-lg text-white font-bold">
                      Bank Details
                    </h3>
                    <div className="px-3">
                      <TextField
                        required
                        id="acc_no"
                        label="Account No"
                        value={salarySlipDetails.bank_details.acc_no}
                        variant="standard"
                        //onChange={onBankFieldChange}
                        fullWidth
                      />

                      <TextField
                        required
                        id="name"
                        label="Bank Name"
                        value={salarySlipDetails.bank_details.name}
                        variant="standard"
                        //onChange={onBankFieldChange}
                        fullWidth
                      />

                      <TextField
                        required
                        id="IFSC_code"
                        label="IFSC Code"
                        value={salarySlipDetails.bank_details.IFSC_code}
                        variant="standard"
                        //onChange={onBankFieldChange}
                        fullWidth
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2  py-3">
                  <div className="p-3">
                    <h3 className="my-2 p-2 bg-[#5cb85c] rounded-lg text-white font-bold">
                      Earnings
                    </h3>
                    <div className="px-3">
                      <TextField
                        required
                        id="base_salary"
                        name="base_salary"
                        label="Base Salary"
                        value={salarySlipDetails.base_salary}
                        variant="standard"
                        onChange={onFieldChange}
                        fullWidth
                      />
                      <TextField
                        required
                        id="attendance.overtime_hrs"
                        name="attendance.overtime_hrs"
                        label="Overtime Hours"
                        value={salarySlipDetails["attendance"].overtime_hrs}
                        variant="standard"
                        onChange={onFieldChange}
                        fullWidth
                      />
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="my-2 p-2 bg-[#5cb85c] rounded-lg text-white font-bold">
                      Deduction
                    </h3>
                    <div className="px-3">
                      <TextField
                        required
                        id="income_tax"
                        name="income_tax"
                        label="Income Tax"
                        value={salarySlipDetails["income_tax"]}
                        variant="standard"
                        onChange={onFieldChange}
                        fullWidth
                      />
                    </div>
                  </div>
                </div>
              </div>
            }
            onClose={onClose}
            hasfooter={"true"}
            handleSubmit={(e) => handleCreatePaySlip(e, salarySlipDetails)}
            showmodal={showmodal}
          />
        )}
    </div>
  );
}

export default EditSalarySlip;
