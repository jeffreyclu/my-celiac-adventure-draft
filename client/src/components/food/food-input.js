import React from 'react';

export default function FoodInput({ name, label, value, handleInputChange }) {
  return (
    <>
      <label>
        {label}
        <input
          name={name}
          type="text"
          value={value}
          onChange={handleInputChange}
        />
      </label>
    </>
  );
}
