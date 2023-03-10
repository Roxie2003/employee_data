import React from "react";

function Card({ employeeInfo, selectCard }) {
  return (
    <div onClick={selectCard} id={employeeInfo.id}>
      <div className="p-5 bg-[#c9dde2] rounded-lg font-bold">
        {employeeInfo.name && employeeInfo.name}
      </div>
    </div>
  );
}

export default Card;
