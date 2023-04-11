import React from "react";

function Invoice({ salarySlipDetails }) {
  console.log(salarySlipDetails);
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
    <>
      <div className=" modal fade fixed inset-0 overflow-auto overscroll-none bg-slate-900 bg-opacity-80 backdrop-blur-md flex justify-center z-50">
        <div className="bg-[#FFFFFF] bg-opacity-90 p-4 md:p-10 w-full h-fit max-w-3xl modal-dialog modal-dialog-scrollable relative ">
          <center>
            <div className="max-w-3xl">
              <div className="flex justify-center align-center space-x-3 my-3">
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
                  <a
                    href="https://weoto.in/"
                    className="text-blue-400 underline"
                  >
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
                  <p> For {salarySlipDetails.attendance.month_year} </p>
                  <p> Employee - {salarySlipDetails.name} </p>
                </div>
              </div>
              <div className="border-2 border-black border-b-0 text-left space-y-4">
                <table className="w-full text-left border-b-2 border-black ">
                  <tbody>
                    <tr>
                      <th className="w-[25%]">Designation</th>
                      <td>:</td>
                      <td>{salarySlipDetails.designation}</td>
                    </tr>
                    <tr>
                      <th className="w-[25%]">Location</th>
                      <td>:</td>
                      <td>{salarySlipDetails.location}</td>
                    </tr>
                    <tr>
                      <th className="w-[25%]">Date of Joining</th>
                      <td>:</td>
                      <td>{salarySlipDetails.date_of_joining}</td>
                    </tr>
                    <tr>
                      <th className="w-[25%]">Bank Details</th>
                      <td>:</td>
                      <td>
                        {salarySlipDetails.bank_details.acc_no +
                          ", " +
                          salarySlipDetails.bank_details.name +
                          ", " +
                          salarySlipDetails.bank_details.IFSC_code}
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
                        {salarySlipDetails.attendance.present_days} Days
                      </td>
                    </tr>
                    <tr className="border-2 border-l-0 border-black">
                      <td className="border-2 border-l-0 border-black">
                        Overtime
                      </td>
                      <td className="border-2 border-black">
                        {salarySlipDetails.attendance.overtime_hrs} Hours
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
                      <th className="border-2 border-black w-[30%]">
                        Deduction
                      </th>
                      <th className="border-2 border-r-0 border-black w-[10%]">
                        Amount
                      </th>
                    </tr>
                    <tr className="">
                      <td className="">Basic Pay</td>
                      <td className="border-l-2 border-black">
                        {salarySlipDetails.base_salary}
                      </td>
                      <td className="border-l-2 border-black">TDS</td>
                      <td className="border-l-2 border-black">0.00</td>
                    </tr>
                    <tr className="">
                      <td className="">Overtime</td>
                      <td className="border-l-2 border-black">
                        {salarySlipDetails.overtime_pay.toFixed(2)}
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
                        {salarySlipDetails.base_salary +
                          salarySlipDetails.overtime_pay +
                          " "}
                      </th>
                      <th className="border-2 border-black">Total Deduction</th>
                      <th className="border-2 border-r-0 border-black">
                        {salarySlipDetails.income_tax}
                      </th>
                    </tr>
                    <tr className="">
                      <th></th>
                      <th></th>
                      <th className="border-2 border-black">Net Payment</th>
                      <th className="">{salarySlipDetails.total_salary}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-left my-4 font-bold space-x-8">
                <span>Amount in words:</span>
                {
                  <span>
                    {number2words(salarySlipDetails.total_salary)} Only
                  </span>
                }
              </div>
              <div className="text-right m-10 mr-14">
                <span>Weoto Technologies Pvt. Ltd.</span>
              </div>
            </div>
            <button
              id="noprint"
              className="bg-red-500 text-[#ffffff] px-3 py-1 rounded-lg "
              onClick={() => {
                document.getElementById("noprint").style.visibility = "hidden";
                window.print();
                document.getElementById("noprint").style.visibility = "visible";
              }}
            >
              Print
            </button>
          </center>
        </div>
      </div>
    </>
  );
}

export default Invoice;
