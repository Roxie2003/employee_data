import React, { useState, useRef } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import Invoice from "./Invoice";
import { useReactToPrint } from 'react-to-print';
import { Model } from "./Model";

function Card({ employeeInfo }) {
  const [openModel, setOpenModel] = useState(false);
  const [monthYear, setMonthYear] = useState("");

  const toggleModel = () => {
    setOpenModel(!openModel);
  };

  const onSelectChange = (e) => {
    setMonthYear(e.target.value);
  };
  const printInvoice = useRef();
  const handlePrint = useReactToPrint({
    content: () => printInvoice.current,
  });
  return (
    <>
      {openModel && (
        <Model
          employeeInfo={employeeInfo} selectedMonthYear={monthYear}
          onClose={toggleModel}
        />
      )}
      <div id={employeeInfo.id}>
        <div className="p-3 md:p-5 bg-[#c9dde2] rounded-lg font-bold">
          <div className="flex flex-wrap justify-center">
            <div className="w-8/12 flex justify-center">
              <img
                src={"https://employee-data-api.vercel.app/" + employeeInfo.image}
                alt="..."
                className="shadow rounded-full max-w-full h-auto align-middle border-none"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center p-5">
            <h1 className="text-xl">{employeeInfo.name}</h1>
            <div className="my-3 pb-3 font-normal">
              <span className="font-bold">Date Of Joining:</span>
              <span> {employeeInfo.date_of_joining} </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <FormControl>
                <InputLabel>Salary Month-Year</InputLabel>
                <Select
                  defaultValue=""
                  value={monthYear}
                  onChange={onSelectChange}
                  className="w-[60vw] md:w-[15vw] h-12"
                >
                  {employeeInfo["attendance"] &&
                    employeeInfo["attendance"].map((attendance) => {
                      return (
                        <MenuItem
                          key={attendance["month_year"]}
                          value={attendance["month_year"]}
                        >
                          {attendance["month_year"]}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>

              <div className="flex flex-col space-y-2 pt-3 items-center justify-center">
                <button
                  className="w-[100%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handlePrint}
                >
                  Download Invoice
                </button>
                <button
                  className="w-[60%] bg-red-500 hover:bg-neutral-900 text-white font-bold py-2 px-4 rounded"
                  onClick={toggleModel}
                >
                  Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden">
        <div ref={printInvoice}>
          <Invoice employeeInfo={employeeInfo} selectedMonthYear={monthYear} />
        </div>
      </div>
    </>
  );
}

export default Card;
