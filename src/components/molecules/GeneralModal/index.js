import React from "react";

const GeneralModal = ({ title, children, isOpen, onClose }) => {
  return (
    <div>
      <input
        type="checkbox"
        className="modal-toggle"
        checked={isOpen}
        readOnly
      />
      <div className="modal" role="dialog">
        <div className="modal-box bg-primary-white dark:bg-primary-black p-0 rounded-none text-primary-white">
          {title && <div className="bg-primary-blue py-2 px-4 text-[20px]">{title}</div>}
          <div className="text-primary-black dark:text-primary-white p-4">{children}</div>
        </div>
        <label className="modal-backdrop" onClick={onClose}></label>
      </div>
    </div>
  );
};

export default GeneralModal;
