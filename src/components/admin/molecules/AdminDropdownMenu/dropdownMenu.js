import React from "react";

const AdminDropdownMenu = ({ children, position }) => {
  return (
    <div className={"dropdown" + (position ? ' ' + position : '')}>
      {children}
    </div>
  );
};

export default AdminDropdownMenu;
