import React from "react";

export const Table = ({ children }) => (
  <table className="table rounded-none shadow-sm bg-secondary-white dark:bg-secondary-black w-full">{children}</table>
);

export const TableHead = ({ children }) => (
  <thead className="bg-primary-blue text-primary-white text-[16px]">{children}</thead>
);

export const TableBody = ({ children }) => (
  <tbody className="text-primary-black dark:text-primary-white">{children}</tbody>
);

export const TableRow = ({ children, className = "" }) => (
  <tr
    className={`border-t-[2px] border-primary-white dark:border-primary-black ${className}`}
  >
    {children}
  </tr>
);

export const TableHeaderCell = ({ children, className = "" }) => (
  <th className={`py-4 font-medium text-left ${className}`}>{children}</th>
);

export const TableCell = ({ children, className = "" }) => (
  <td className={`font-normal py-4 ${className}`}>{children}</td>
);
