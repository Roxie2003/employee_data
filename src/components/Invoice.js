import React, { useState, useEffect } from "react";

const Invoice = ({ employeeInfo, selectedMonthYear }) => {
    const [selectedAttendance, setSelectedAttendance] = useState({})
    const [overtime_cost, setOvertime_cost] = useState(0)
    useEffect(() => {
        Array.from(employeeInfo.attendance).forEach(element => {
            if (element.month_year === selectedMonthYear) {
                setSelectedAttendance(element);
                setOvertime_cost((selectedAttendance.overtime_hrs ? selectedAttendance.overtime_hrs : 0) * 100)
            }
        });
        //eslint-disable-next-line
    }, [selectedMonthYear, selectedAttendance, overtime_cost]);

    let num = "Zero One Two Three Four Five Six Seven Eight Nine Ten Eleven Twelve Thirteen Fourteen Fifteen Sixteen Seventeen Eighteen Nineteen".split(" ");
    let tens = "Twenty Thirty Forty Fifty Sixty Seventy Eighty Ninety".split(" ");

    function number2words(n) {
        if (n < 20) return num[n];
        let digit = n % 10;
        if (n < 100) return tens[~~(n / 10) - 2] + (digit ? "-" + num[digit] : "");
        if (n < 1000) return num[~~(n / 100)] + " hundred" + (n % 100 === 0 ? "" : " " + number2words(n % 100));
        return number2words(~~(n / 1000)) + " thousand" + (n % 1000 !== 0 ? " " + number2words(n % 1000) : "");
    }
    return (
        <div className='mx-24 my-12'>
            <div className='max-w-[750px] min-w-[700px]'>
                <div className='flex justify-center space-x-3 my-3'>
                    <img src="./logo.png" alt='' />
                    <h1 className='text-2xl font-bold mt-4'>Weoto Technologies &nbsp;Pvt. Ltd.</h1>
                </div>
                <div>
                    <p className='font-bold text-center'>
                        Second Floor, Devshri Apartment, 4, Patil Lane<br />
                        Number 1, Patil Colony, Canada Corner, Nashik, Maharashtra
                    </p>
                    <div className='flex justify-between px-16 text-center'>
                        <a href="https://weoto.in/" className='text-blue-400 underline'>https://weoto.in/</a>
                        <span>+91-8329587681</span>
                        <a href="mailto:contact@weoto.in" className='text-blue-400 underline'>contact@weoto.in</a>
                    </div>
                    <div className='font-bold text-center'>
                        <p> PAY SLIP </p>
                        <p> For {selectedMonthYear} </p>
                        <p className=" pb-2"> Employee - {employeeInfo.name} </p>
                    </div>
                </div>
                <div className='border-2 border-black border-b-0 text-left space-y-4'>
                    <table className='w-full text-left border-b-2 border-black'>
                        <tbody>
                            <tr>
                                <th className='w-[25%] justify-center'>Designation</th>
                                <td>:</td>
                                <td>{employeeInfo.designation}</td>
                            </tr>
                            <tr>
                                <th className='w-[25%]'>Location</th>
                                <td>:</td>
                                <td>{employeeInfo.location}</td>
                            </tr>
                            <tr>
                                <th className='w-[25%]'>Date of Joining</th>
                                <td>:</td>
                                <td>{employeeInfo.date_of_joining}</td>
                            </tr>
                            <tr>
                                <th className='w-[25%] pb-2'>Bank Details</th>
                                <td className=" pb-2">:</td>
                                <td className=" pb-2">{employeeInfo.bank_details.acc_no + ", " + employeeInfo.bank_details.name + ", " + employeeInfo.bank_details.IFSC_code}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className='w-[50%] text-left border-2 border-l-0 border-black'>
                        <tbody>
                            <tr className='border-2 border-l-0 border-black'>
                                <th className='border-2 border-l-0 border-black pb-2'>Attendance Details</th>
                                <th className='border-2 border-black pb-2'>Days</th>
                            </tr>
                            <tr className='border-2 border-l-0 border-black pb-2'>
                                <td className='border-2 border-l-0 border-black pb-2'>Present Days</td>
                                <td className='border-2 border-black pb-2'>{selectedAttendance.present_days} Days</td>
                            </tr>
                            <tr className='border-2 border-l-0 border-black pb-2'>
                                <td className='border-2 border-l-0 border-black pb-2'>Overtime</td>
                                <td className='border-2 border-black pb-2'>{selectedAttendance.overtime_hrs} Hours</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className='w-full text-left border-t-2 border-black'>
                        <tbody>
                            <tr className='border-t-2 border-b-2 border-black'>
                                <th className='border-2 border-l-0 border-black w-[50%] pb-2'>Earning</th>
                                <th className='border-2 border-black w-[10%] pb-2'>Amount</th>
                                <th className='border-2 border-black w-[30%] pb-2'>Deduction</th>
                                <th className='border-2 border-r-0 border-black w-[10%] pb-2'>Amount</th>
                            </tr>
                            <tr className=''>
                                <td className=''>Basic Pay</td>
                                <td className='border-l-2 border-black'>{employeeInfo.base_salary}</td>
                                <td className='border-l-2 border-black'>TDS</td>
                                <td className='border-l-2 border-black'>0.00</td>
                            </tr>
                            <tr className=''>
                                <td className=''>Overtime</td>
                                <td className='border-l-2 border-black'>{(overtime_cost).toFixed(2)}</td>
                                <td className='border-l-2 border-black'></td>
                                <td className='border-l-2 border-black'>0.00</td>
                            </tr>
                            <tr className=''>
                                <td className=''></td>
                                <td className='border-l-2 border-black'>0.00</td>
                                <td className='border-l-2 border-black'></td>
                                <td className='border-l-2 border-black'>0.00</td>
                            </tr>
                            <tr className=''>
                                <td className=''></td>
                                <td className='border-l-2 border-black'>0.00</td>
                                <td className='border-l-2 border-black'></td>
                                <td className='border-l-2 border-black'></td>
                            </tr>
                            <tr className=''>
                                <td className=' pb-2'></td>
                                <td className='border-l-2 border-black pb-2'>0.00</td>
                                <td className='border-l-2 border-black pb-2'></td>
                                <td className='border-l-2 border-black pb-2'></td>
                            </tr>
                            <tr className=''>
                                <th className='border-2 border-l-0 border-black pb-2'>Total Earning</th>
                                <th className='border-2 border-b-0 border-black pb-2'>{employeeInfo.base_salary + overtime_cost}</th>
                                <th className='border-2 border-black pb-2'>Total Deduction</th>
                                <th className='border-2 border-r-0 border-black pb-2'>0.00</th>
                            </tr>
                            <tr className=''>
                                <th></th>
                                <th></th>
                                <th className='border-2 border-black pb-2'>Net Payment</th>
                                <th className=' pb-2'>{employeeInfo.base_salary + overtime_cost}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='text-left my-4 font-bold space-x-8'>
                    <span>Amount in words:</span>
                    <span>{number2words(employeeInfo.base_salary + (overtime_cost))} Only</span>
                </div>
                <div className='text-right m-10 mr-14'>
                    <span>Weoto Technologies Pvt. Ltd.</span>
                </div>
            </div>
        </div>
    )
}

export default Invoice