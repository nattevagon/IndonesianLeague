import React, { useEffect, useRef, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import CalendarField from "./calendarField";

const TextField = ({
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  className = "",
  label,
  fieldValid,
  onKeyDown,
  options = [],
}) => {
  let baseClass = `w-full text-[16px] p-2 input input-bordered bg-secondary-white dark:bg-secondary-black rounded-none border-third-white dark:border-third-black placeholder-third-black dark:placeholder-third-white ${className}`;
  const [showPassword, setShowPassword] = useState(false);

  if (fieldValid && (fieldValid?.status && (fieldValid?.name === name))) {
    baseClass = baseClass + " !border-primary-red";
  }

  console.log(fieldValid)

  if (type === "textarea") {
    return (
      <div className="form-control w-full text-primary-black dark:text-primary-white">
        {label && <label className="label">{label}</label>}
        <textarea
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={`${baseClass} textarea min-h-[100px] max-h-[200px]`}
        />
        {fieldValid && (fieldValid?.status && (fieldValid?.name === name)) && <p className="mt-1 text-[10px] text-primary-red">{fieldValid?.message}</p>}
      </div>
    );
  }

  if (type === "select") {
    return (
      <div className="form-control w-full text-primary-black dark:text-primary-white">
        {label && <label className="label">{label}</label>}
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`select bg-secondary-white dark:bg-secondary-black ${baseClass}` + (value === "" ? " text-third-black dark:text-third-white" : "")}
        >
          <option className="text-third-black dark:text-third-white" value="">{placeholder}</option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
        {fieldValid && (fieldValid?.status && (fieldValid?.name === name)) && <p className="mt-1 text-[10px] text-primary-red">{fieldValid?.message}</p>}
      </div>
    );
  } else if (type === "calendar") {
    return <CalendarField {...{ name, value, placeholder, onChange, baseClass }} />;
  } else {
    return (
      <div className="form-control w-full text-primary-black dark:text-primary-white">
        {label && <label className="label">{label}</label>}

        <div className="relative">
          <input
            type={type === "password" ? (showPassword ? "text" : "password") : type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className={baseClass}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-4 h-4 cursor-pointer text-primary-black dark:text-primary-white" />
              ) : (
                <EyeIcon className="w-4 h-4 cursor-pointer text-primary-black dark:text-primary-white" />
              )}
            </button>
          )}
        </div>
        {fieldValid && (fieldValid?.status && (fieldValid?.name === name)) && <p className="mt-1 text-[10px] text-primary-red">{fieldValid?.message}</p>}
      </div>
    );
  }
};

export default TextField;