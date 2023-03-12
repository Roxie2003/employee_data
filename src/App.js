import { useState, useEffect } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import Card from "./components/Card";
import { Model } from "./components/Model";

function App() {
  const [openModel, setOpenModel] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [allEmployeesData, setAllEmployeesData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [searchInput, setSearchInput] = useState("");

  const fetchData = async () => {
    let mainURL = `https://employee-data-api.vercel.app/api/employees`;
    let mainData = await fetch(mainURL);
    let mainParsedData = await mainData.json();
    setAllEmployeesData(mainParsedData["results"]);
  };

  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setFilteredEmployees(allEmployeesData);
  }, [allEmployeesData]);

  const handelChange = async (e) => {
    await setSearchInput(e.target.value);
    setFilteredEmployees(
      allEmployeesData.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const toggleModel = (event) => {
    if (Object.keys(selectedEmployee).length === 0) {
      setSelectedEmployee(event.currentTarget);
    } else setSelectedEmployee({});
    setOpenModel(!openModel);
  };

  return (
    <>
      {openModel && (
        <Model
          employeeID={selectedEmployee.getAttribute("id")}
          onClose={toggleModel}
        />
      )}

      <div>
        <div className="bg-[#000000] text-white p-3">
          <div className="p-5">
            <h1 className=" text-3xl">
              <span className="p-2 md:p-4">Employee Data</span>
            </h1>
          </div>
          <div className="flex justify-evenly items-center p-5">
            <label htmlFor="search">Search by</label>
            <div className="bg-[#c9dde2] rounded-lg flex items-center w-3/4 space-x-2 pr-3">
              <input
                type="search"
                name="search"
                id="search"
                value={searchInput}
                onChange={handelChange}
                placeholder="Name"
                className="bg-[#c9dde2] p-3 rounded-lg w-full"
              />
              <BsSearch className="bg-transparent text-black" />
            </div>
          </div>
        </div>
        <div className="m-5 p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 m-5 px-5">
            {filteredEmployees &&
              filteredEmployees.map((employee) => {
                return (
                  <Card
                    key={employee.id}
                    employeeInfo={employee}
                    toggleModel={toggleModel}
                  ></Card>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
