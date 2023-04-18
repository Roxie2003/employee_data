import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import { PaySlip } from "./components/PaySlip";
import { Routes, Route } from "react-router-dom";
import SalarySlipTable from "./components/SalarySlipTable";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import UserAccount from "./components/User/UserAccount";
import UserDashboard from "./components/User/UserDashboard";

function App() {
  
  const [user, setUser] = useState();

  useEffect(() => {
    let localUser = JSON.parse(localStorage.getItem('user'))
    setUser(localUser)

    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        {/*   Auth   */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>


        {/*   Employee   */}
        <Route path="/" element={<UserDashboard />}></Route>
        <Route path="/myaccount" element={<UserAccount />}></Route>


        {/*   Admin   */}
        <Route path="/dashboard" element={<Home />}></Route>
        <Route path="/paySlip" element={<PaySlip />}></Route>
        <Route path="/salarySlip" element={<SalarySlipTable />}></Route>
      </Routes>
    </>
  );
}

export default App;
