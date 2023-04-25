import React from "react";
import { useEffect, useContext } from "react";
import EnhancedTable from "./EnhancedTable";
import { useNavigate } from "react-router-dom";
import { LocalContext } from "../Auth/Context";
export const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(LocalContext);
  useEffect(() => {
    try {
      if (!user.admin) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
    //eslint-disable-next-line
  }, []);
  return (
    <div className="p-4 md:p-10">
      <EnhancedTable />
    </div>
  );
};
