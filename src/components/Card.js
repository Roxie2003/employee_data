import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
  InputLabel,
} from "@material-ui/core";

function Card({ employeeInfo, toggleModel }) {
  const [monthYear, setMonthYear] = useState("");

  const onSelectChange = (e) => {
    setMonthYear(e.target.value);
  };

  return (
    <div id={employeeInfo.id}>
      <div className="p-5 bg-[#c9dde2] rounded-lg font-bold">
        <div className="flex flex-wrap justify-center">
          <div className="w-8/12 px-4">
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
            {" " + employeeInfo.date_of_joining}
          </div>
          <div className="flex flex-wrap items-center justify-center">
            <FormControl>
              <InputLabel>Salary Month-Year</InputLabel>
              <Select
                defaultValue=""
                value={monthYear}
                style={{
                  width: 180,
                  height: 50,
                }}
                onChange={onSelectChange}
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

            <div className="flex flex-wrap space-y-2 p-3 items-center justify-center">
              <button
                className="w-56 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {}}
              >
                Download Invoice
              </button>
              <button
                className="w-36 bg-red-500 hover:bg-neutral-900 text-white font-bold py-2 px-4 rounded"
                onClick={toggleModel}
              >
                Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
