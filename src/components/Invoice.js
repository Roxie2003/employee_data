import React, { useState, useEffect } from "react";

const Invoice = ({ employeeInfo, selectedMonthYear }) => {
  const [selectedAttendance, setSelectedAttendance] = useState({});
  const [overtime_cost, setOvertime_cost] = useState(0);
  useEffect(() => {
    Array.from(employeeInfo.attendance).forEach((element) => {
      if (element.month_year === selectedMonthYear) {
        setSelectedAttendance(element);
        setOvertime_cost(
          (selectedAttendance.overtime_hrs
            ? selectedAttendance.overtime_hrs
            : 0) * 100
        );
      }
    });
    //eslint-disable-next-line
  }, [selectedMonthYear, selectedAttendance, overtime_cost]);

  let num =
    "Zero One Two Three Four Five Six Seven Eight Nine Ten Eleven Twelve Thirteen Fourteen Fifteen Sixteen Seventeen Eighteen Nineteen".split(
      " "
    );
  let tens = "Twenty Thirty Forty Fifty Sixty Seventy Eighty Ninety".split(" ");

  function number2words(n) {
    if (n < 20) return num[n];
    let digit = n % 10;
    if (n < 100) return tens[~~(n / 10) - 2] + (digit ? "-" + num[digit] : "");
    if (n < 1000)
      return (
        num[~~(n / 100)] +
        " hundred" +
        (n % 100 === 0 ? "" : " " + number2words(n % 100))
      );
    return (
      number2words(~~(n / 1000)) +
      " thousand" +
      (n % 1000 !== 0 ? " " + number2words(n % 1000) : "")
    );
  }
  return (
    <div className="w-full my-12">
      <center>
        <div className="max-w-3xl">
          <div className="flex justify-center space-x-3 my-3">
            <img src="./logo.png" alt="" />
            <h1 className="text-2xl font-bold mt-4">
              Weoto Technologies Pvt. Ltd.
            </h1>
          </div>
          <div>
            <p className="font-bold">
              Second Floor, Devshri Apartment, 4, Patil Lane
              <br />
              Number 1, Patil Colony, Canada Corner, Nashik, Maharashtra
            </p>
            <div className="flex justify-between px-16">
              <a href="https://weoto.in/" className="text-blue-400 underline">
                https://weoto.in/
              </a>
              <span>+91-8329587681</span>
              <a
                href="mailto:contact@weoto.in"
                className="text-blue-400 underline"
              >
                contact@weoto.in
              </a>
            </div>
            <div className="font-bold">
              <p> PAY SLIP </p>
              <p> For {selectedMonthYear} </p>
              <p> Employee - {employeeInfo.name} </p>
            </div>
          </div>
          <div className="border-2 border-black border-b-0 text-left space-y-4">
            <table className="w-full text-left border-b-2 border-black">
              <tbody>
                <tr>
                  <th className="w-[25%]">Designation</th>
                  <td>:</td>
                  <td>{employeeInfo.designation}</td>
                </tr>
                <tr>
                  <th className="w-[25%]">Location</th>
                  <td>:</td>
                  <td>{employeeInfo.location}</td>
                </tr>
                <tr>
                  <th className="w-[25%]">Date of Joining</th>
                  <td>:</td>
                  <td>
                    {new Date(employeeInfo.date_of_joining).toUTCString()}
                  </td>
                </tr>
                <tr>
                  <th className="w-[25%]">Bank Details</th>
                  <td>:</td>
                  <td>
                    {employeeInfo.bank_details.acc_no +
                      ", " +
                      employeeInfo.bank_details.name +
                      ", " +
                      employeeInfo.bank_details.IFSC_code}
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="w-[50%] text-left border-2 border-l-0 border-black">
              <tbody>
                <tr className="border-2 border-l-0 border-black">
                  <th className="border-2 border-l-0 border-black">
                    Attendance Details
                  </th>
                  <th className="border-2 border-black">Days</th>
                </tr>
                <tr className="border-2 border-l-0 border-black">
                  <td className="border-2 border-l-0 border-black">
                    Present Days
                  </td>
                  <td className="border-2 border-black">
                    {selectedAttendance.present_days} Days
                  </td>
                </tr>
                <tr className="border-2 border-l-0 border-black">
                  <td className="border-2 border-l-0 border-black">Overtime</td>
                  <td className="border-2 border-black">
                    {selectedAttendance.overtime_hrs} Hours
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="w-full text-left border-t-2 border-black">
              <tbody>
                <tr className="border-t-2 border-b-2 border-black">
                  <th className="border-2 border-l-0 border-black w-[50%]">
                    Earning
                  </th>
                  <th className="border-2 border-black w-[10%]">Amount</th>
                  <th className="border-2 border-black w-[30%]">Deduction</th>
                  <th className="border-2 border-r-0 border-black w-[10%]">
                    Amount
                  </th>
                </tr>
                <tr className="">
                  <td className="">Basic Pay</td>
                  <td className="border-l-2 border-black">
                    {employeeInfo.base_salary}
                  </td>
                  <td className="border-l-2 border-black">TDS</td>
                  <td className="border-l-2 border-black">0.00</td>
                </tr>
                <tr className="">
                  <td className="">Overtime</td>
                  <td className="border-l-2 border-black">
                    {overtime_cost.toFixed(2)}
                  </td>
                  <td className="border-l-2 border-black"></td>
                  <td className="border-l-2 border-black">0.00</td>
                </tr>
                <tr className="">
                  <td className=""></td>
                  <td className="border-l-2 border-black">0.00</td>
                  <td className="border-l-2 border-black"></td>
                  <td className="border-l-2 border-black">0.00</td>
                </tr>
                <tr className="">
                  <td className=""></td>
                  <td className="border-l-2 border-black">0.00</td>
                  <td className="border-l-2 border-black"></td>
                  <td className="border-l-2 border-black"></td>
                </tr>
                <tr className="">
                  <td className=""></td>
                  <td className="border-l-2 border-black">0.00</td>
                  <td className="border-l-2 border-black"></td>
                  <td className="border-l-2 border-black"></td>
                </tr>
                <tr className="">
                  <th className="border-2 border-l-0 border-black">
                    Total Earning
                  </th>
                  <th className="border-2 border-b-0 border-black">
                    {employeeInfo.base_salary + overtime_cost}
                  </th>
                  <th className="border-2 border-black">Total Deduction</th>
                  <th className="border-2 border-r-0 border-black">0.00</th>
                </tr>
                <tr className="">
                  <th></th>
                  <th></th>
                  <th className="border-2 border-black">Net Payment</th>
                  <th className="">
                    {employeeInfo.base_salary + overtime_cost}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-left my-4 font-bold space-x-8">
            <span>Amount in words:</span>
            <span>
              {number2words(employeeInfo.base_salary + overtime_cost)} Only
            </span>
          </div>
          <div className="text-right m-10 mr-14">
            <span>Weoto Technologies Pvt. Ltd.</span>
          </div>
        </div>
      </center>
    </div>
  );
};

export default Invoice;
