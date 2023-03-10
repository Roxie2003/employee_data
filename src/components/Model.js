import React, { useEffect, useState } from "react";
import { BsXCircle } from "react-icons/bs";

export const Model = ({ employeeID, onClose }) => {
  const handleOnClose = () => {
    onClose();
  };
  return (
    <div className="modal fade fixed inset-0 overflow-auto overscroll-none bg-slate-900 bg-opacity-80 backdrop-blur-md flex justify-center z-50">
      <div className="flex h-screen items-center"></div>
      <div className="bg-[#deeded] bg-opacity-90 p-4 md:p-10 h-fit max-w-3xl modal-dialog modal-dialog-scrollable relative text-[#2e3159]">
        {employeeID}
        <button>
          <BsXCircle onClick={handleOnClose} />
        </button>
      </div>
    </div>
  );
};
