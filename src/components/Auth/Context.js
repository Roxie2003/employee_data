import React, { createContext, useState } from "react";

export const LocalContext = createContext();

export const LocalProvider = ({ children }) => {
  const [user, setUser] = useState({
    ...JSON.parse(localStorage.getItem("user")),
  });

  return (
    <LocalContext.Provider value={[user, setUser]}>
      {children}
    </LocalContext.Provider>
  );
};
