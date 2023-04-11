import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import { PaySlip } from "./components/PaySlip";
import { Routes, Route } from "react-router-dom";
import SalarySlipTable from "./components/SalarySlipTable";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/paySlip" element={<PaySlip />}></Route>
        <Route path="/salarySlip" element={<SalarySlipTable />}></Route>
      </Routes>
    </>
  );
}

export default App;
