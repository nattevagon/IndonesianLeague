import Link from "next/link";

const AdminDropdownItem = ({ icon: Icon, label, onClick, linkUrl }) => {
  return (
    <div className="cursor-pointer">
      {onClick && (
        <div className="flex items-center w-full p-4 hover:bg-secondary-blue" onClick={() => onClick()}>
          <Icon className="w-[16px] text-primary-white mr-2" />
          <div className="text-primary-white text-[16px] font-medium">{label}</div>
        </div>
      )}
      {linkUrl && (
        <Link className="flex items-center w-full p-4 hover:bg-secondary-blue" href={linkUrl}>
          <Icon className="w-[16px] text-primary-white mr-2" />
          <div className="text-primary-white text-[16px] font-medium">{label}</div>
        </Link>
      )}
    </div>
  );
};

export default AdminDropdownItem;
