// components/CustomMultiSelect.jsx
import React from 'react';
import { Select } from 'antd';
import './style.scss';

const { Option } = Select;

const CustomMultiSelect = ({
  label,
  placeholder,
  options,
  value,
  onChange,
  mode = 'multiple',
  showSearch = true,
  optionLabelProp = 'label',
  description,
  isRequired=false,
  ...rest
}) => {
  return (
    <div className="custom-multi-select-wrapper">
      {label && <label className="dropdown-label">{label}{isRequired && <span className='isRequired'>*</span>}</label>}
      {description && <div className="dropdown-description">{description}</div>}
      <Select
        mode={mode}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        showSearch={showSearch}
        optionLabelProp={optionLabelProp}
        className="custom-multi-select"
        {...rest}
      >
        {options.map((opt) => (
          <Option key={opt.value} value={opt.value} label={opt.label}>
            {opt.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default CustomMultiSelect;
