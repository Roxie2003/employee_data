import React from "react";
import { useEffect } from "react";
import EnhancedTable from "./EnhancedTable";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    try {
      if (!user) {
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
