import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import jsPDF from 'jspdf';
import Button from "@mui/material/Button";
import Invoice from "./Invoice";

export const PaySlip = () => {
  const location = useLocation();
  const reportTemplateRef = useRef(null);
  const { employee, month_year } = location.state;


  const [employeeWithAtt, setEmployeeWithAtt] = useState({});
  useEffect(() => {
    console.log(employee);
    console.log(month_year);
    setEmployeeWithAtt({
      ...employee,
      income_tax: 0,
      attendance: employee["attendance"].filter((att) => {
        if (att.month_year === month_year) console.log(att);
        return att.month_year === month_year;
      })[0],
    });
  }, [employee, month_year]);

  const onFieldChange = (e) => {
    if (e.target.id.includes("attendance."))
      setEmployeeWithAtt({
        ...employeeWithAtt,
        attendance: {
          ...employeeWithAtt.attendance,
          [e.target.id.replace("attendance.", "")]: e.target.value,
        },
      });
    else
      setEmployeeWithAtt({ ...employeeWithAtt, [e.target.id]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF({
      format: [1024, 974],
      unit: 'pt',
    });

    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        await doc.save(`Payslip-${employee.name}-${month_year}`);
      },
    });
  }

  const handleGenerateSlip = async () => {
    console.log(employeeWithAtt);
    const { base_salary, id, _id, ...salarySlip } = employeeWithAtt;
    salarySlip["overtime_pay"] =
      (await salarySlip["attendance"].overtime_hrs) * 500;
    salarySlip["total_salary"] = await (base_salary +
      salarySlip["overtime_pay"] -
      salarySlip["income_tax"]);

    salarySlip["employee_id"] = await id;
    console.log(salarySlip);
    fetch(
      "https://employee-payroll-api.onrender.com/api/salarySlips/" +
      salarySlip.employee_id +
      "/",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",

        // Fields that to be updated are passed
        body: JSON.stringify(salarySlip),
      }
    )
      .then(function (response) {
        // console.log(response);
        return response.json();
      })
      .then(function (data) {
        generatePDF()
      });
  };

  return (
    <div>
      {employeeWithAtt["attendance"] && (
        <div align="center">
          <div className="grid grid-cols-2 m-5">
            <div className="p-3">
              <h3 className="my-2 p-2 bg-[#5cb85c] rounded-lg text-white font-bold">
                Employee Details
              </h3>
              <div className="px-3">
                <TextField
                  required
                  id="name"
                  label="Name"
                  value={employee.name}
                  variant="standard"
                  //onChange={onFieldChange}
                  fullWidth
                />
                <TextField
                  required
                  id="designation"
                  label="Designation"
                  value={employee.designation}
                  variant="standard"
                  //onChange={onFieldChange}
                  fullWidth
                />
                <TextField
                  required
                  id="location"
                  label="Location"
                  value={employee.location}
                  variant="standard"
                  //onChange={onFieldChange}
                  fullWidth
                />
                <TextField
                  required
                  id="joining_date"
                  label="Date of Joining"
                  value={employee.date_of_joining}
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
                  value={employee.bank_details.acc_no}
                  variant="standard"
                  //onChange={onBankFieldChange}
                  fullWidth
                />

                <TextField
                  required
                  id="name"
                  label="Bank Name"
                  value={employee.bank_details.name}
                  variant="standard"
                  //onChange={onBankFieldChange}
                  fullWidth
                />

                <TextField
                  required
                  id="IFSC_code"
                  label="IFSC Code"
                  value={employee.bank_details.IFSC_code}
                  variant="standard"
                  //onChange={onBankFieldChange}
                  fullWidth
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 m-5 py-3">
            <div className="p-3">
              <h3 className="my-2 p-2 bg-[#5cb85c] rounded-lg text-white font-bold">
                Earnings
              </h3>
              <div className="px-3">
                <TextField
                  required
                  id="base_salary"
                  label="Base Salary"
                  value={employeeWithAtt.base_salary}
                  variant="standard"
                  onChange={onFieldChange}
                  fullWidth
                />
                <TextField
                  required
                  id="attendance.overtime_hrs"
                  label="Overtime Hours"
                  value={employeeWithAtt["attendance"].overtime_hrs}
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
                  label="Income Tax"
                  value={employeeWithAtt["income_tax"]}
                  variant="standard"
                  onChange={onFieldChange}
                  fullWidth
                />
              </div>
            </div>
          </div>
          <Button autoFocus variant="contained" onClick={handleGenerateSlip}>
            Generate Salary Slip
          </Button>
          <div style={{ visibility: "hidden" }}>
          <div ref={reportTemplateRef}>
            <Invoice employeeInfo={employee} selectedMonthYear={month_year} />
          </div>
          </div>
        </div>
      )}
    </div>
  );
};
