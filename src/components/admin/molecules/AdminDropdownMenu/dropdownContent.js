const AdminDropdownContent = ({ children }) => {
  return (
    <div
      tabIndex={0}
      className="dropdown-content menu z-[2] left-1/2 -translate-x-1/2"
    >
      <ul className="bg-primary-blue w-52 shadow dropdown-content z-1">
        {children}
      </ul>
    </div>
  );
};

export default AdminDropdownContent;
