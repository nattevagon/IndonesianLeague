import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

const AdminDropdownButton = ({ children }) => {
  return (
    <div tabIndex={0} role="button" className="mx-2 text-[18px]">
      {children}
    </div>
  );
};

export default AdminDropdownButton;
