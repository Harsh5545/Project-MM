import React from 'react';
import Select from 'react-select';
import icons from '@/hooks/icons'; // Assuming icons is an object of { name: IconComponent }

const IconDropdown = ({ value, onChange }) => {
  const options = Object.keys(icons).map((iconKey) => ({
    value: iconKey,
    label: (
      <div className="flex items-center space-x-2">
        {React.createElement(icons[iconKey], { className: 'w-5 h-5' })} {/* Render icon */}
        <span>{iconKey}</span>
      </div>
    ),
  }));

  const customStyles = {
    option: (provided) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
    }),
    singleValue: (provided) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
    }),
  };

  return (
    <Select
      options={options}
      value={options.find((option) => option.value === value)}
      onChange={(selected) => onChange(selected.value)}
      styles={customStyles}
      components={{
        SingleValue: ({ data }) => (
          <div className="flex items-center space-x-2">
            {React.createElement(icons[data.value], { className: 'w-5 h-5' })}
            <span>{data.value}</span>
          </div>
        ),
        Option: ({ data }) => <div>{data.label}</div>,
      }}
    />
  );
};

export default IconDropdown;
