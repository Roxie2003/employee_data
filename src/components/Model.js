import React from "react";
import { BsXCircle } from "react-icons/bs";
import Invoice from "./Invoice";

export const Model = ({ onClose,  employeeInfo, selectedMonthYear }) => {
  const handleOnClose = () => {
    onClose();
  };
  return (
    <div className="modal fade fixed inset-0 overflow-auto overscroll-none bg-slate-900 bg-opacity-80 backdrop-blur-md flex justify-center z-50">
      <div className="flex h-screen items-center"></div>
      <div className="bg-[#deeded] bg-opacity-90 p-4 md:p-10 h-fit w-[60vw] modal-dialog modal-dialog-scrollable relative text-[#2e3159]">
        <button className="absolute right-10">
          <BsXCircle onClick={handleOnClose} className="text-2xl text-red-600" />
        </button>
        <Invoice employeeInfo={employeeInfo} selectedMonthYear={selectedMonthYear} />
      </div>
    </div>
  );
};
