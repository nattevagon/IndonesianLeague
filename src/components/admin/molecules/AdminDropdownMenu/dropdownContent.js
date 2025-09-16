const AdminDropdownContent = ({ children, className = "", type, menuClassName = "" }) => {
  return (
    <div
      tabIndex={0}
      className={"dropdown-content menu z-[2]" + (className ? " " + className : "")}
    >
      {type === 'menu' ?
        <ul className={"w-52 shadow dropdown-content z-1" + (menuClassName ? ' ' + menuClassName : '')}>
          {children}
        </ul>
        :
        children
      }
    </div>
  );
};

export default AdminDropdownContent;
