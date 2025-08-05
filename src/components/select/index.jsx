// components/CustomSingleSelect.jsx
import React from 'react';
import { Select } from 'antd';
import './style.scss';

const { Option } = Select;

const CustomSingleSelect = ({
  label,
  placeholder,
  options,
  value,
  onChange,
  name,
  isRequired,
  description,
  ...rest
}) => {
  return (
    <div className="custom-single-select-wrapper">
      {label && <label className="dropdown-label">{label}{isRequired && <span className='isRequired'>*</span>}</label>}
      {description && <div className="dropdown-description">{description}</div>}
      <Select
        placeholder={placeholder}
        value={value}
        onChange={(val) => onChange({ target: { name, value: val } })}
        className="custom-single-select"
        {...rest}
      >
        {options.map((opt) => (
          <Option key={opt.value} value={opt.value}>
            {opt.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};


export default CustomSingleSelect;
