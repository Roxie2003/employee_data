import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import Card from "./components/Card";

function App() {
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [allEmployeesData, setAllEmployeesData] = useState([]);
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

  return (
    <>
      <div>
        <div className="bg-[#000000] text-white p-3">
          <div className="p-5">
            <h1 className="p-2 md:p-4 text-3xl font-semibold"> Employee Data </h1>
          </div>
          <div className="flex justify-evenly items-center p-5 space-x-4">
            <label htmlFor="search" className="md:text-xl">Search</label>
            <div className="rounded-lg flex items-center  md:w-3/4 space-x-2 pr-3">
              <input
                type="search"
                name="search"
                id="search"
                value={searchInput}
                onChange={handelChange}
                placeholder="Name"
                className="bg-[#c9dde2] text-black p-2 md:p-3 rounded-lg w-full"
              />
              <BsSearch className="bg-transparent text-black" />
            </div>
          </div>
        </div>
        <div className="m-5 p-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 md:m-5 md:px-5">
            {filteredEmployees &&
              filteredEmployees.map((employee) => {
                return (
                  <Card
                    key={employee.id}
                    employeeInfo={employee}
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
