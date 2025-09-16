import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

const AdminDropdownButton = ({ children }) => {
  return (
    <div tabIndex={0} role="button">
      {children}
    </div>
  );
};

export default AdminDropdownButton;
