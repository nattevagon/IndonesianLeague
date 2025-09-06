import React from "react";

const AdminDropdownMenu = ({ children }) => {
  return (
    <div className="dropdown dropdown-left dropdown-center">
      {children}
    </div>
  );
};

export default AdminDropdownMenu;
