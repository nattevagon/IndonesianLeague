import Link from "next/link";
import React from "react";

const Button = ({ href, onClick, icon: Icon, label, disabled, className = "", labelClassName = "", iconClassName = "" }) => {
  console.log(Icon)
  const baseClasses = "bg-primary-blue hover:bg-secondary-blue size-fit cursor-pointer disabled:opacity-75 disabled:cursor-wait" + (className ? ' ' + className : '');
  const content = (
    <div className={"flex px-4 py-2 items-center" + (label ? ' gap-2' : ' justify-center')}>
      {Icon && <Icon className={"h-[24px] cursor-pointer text-primary-white" + (iconClassName ? " " + iconClassName : "")} />}
      <div className={"text-primary-white text-[16px] font-medium" + (labelClassName ? ' ' + labelClassName : '')}>{label}</div>
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
