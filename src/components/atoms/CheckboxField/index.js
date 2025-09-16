import React from 'react'

const CheckboxField = ({ className, name, label, checked, onChange }) => {
  return (
    <div className={"flex items-center" + (className ? ' ' + className : '')} >
      <input type="checkbox" className="checkbox w-[20px] h-[20px] rounded-none" checked={checked} name={name} onChange={onChange} />
      {label && <label className="ml-2">{label}</label>}
    </div >
  )
}

export default CheckboxField