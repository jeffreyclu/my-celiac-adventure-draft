import React from 'react';

export default function FoodInput({
  name,
  label,
  type,
  value,
  handleInputChange,
}) {
  return (
    <>
      <label>
        {label}
        <input
          name={name}
          type={type}
          value={value}
          onChange={handleInputChange}
        />
      </label>
    </>
  );
}
