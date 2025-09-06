import Link from "next/link";
import React from "react";

const Button = ({ href, onClick, icon: Icon, label, disabled }) => {
  const baseClasses = "bg-primary-blue hover:bg-secondary-blue size-fit cursor-pointer disabled:opacity-75 disabled:cursor-wait";
  const content = (
    <div className="flex px-4 py-2 items-center gap-2">
      {Icon && <Icon className="w-[16px] cursor-pointer text-primary-white" />}
      <div className="text-primary-white text-[16px] font-medium">{label}</div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={baseClasses} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
};

export default Button;
