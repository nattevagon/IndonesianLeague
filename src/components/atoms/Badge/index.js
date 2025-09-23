import Link from "next/link";
import React from "react";

const Badge = ({ key, children, link }) => {
  if (link) {
    return (
      <Link
        key={key}
        href={link}
        className="flex items-center bg-primary-blue text-primary-white text-sm px-2 py-1 cursor-pointer hover:underline"
      >
        {children}
      </Link>
    );
  } else {
    return (
      <span
        key={key}
        className="flex items-center bg-primary-blue text-primary-white text-sm px-2 py-1"
      >
        {children}
      </span>
    );
  }
};

export default Badge;
