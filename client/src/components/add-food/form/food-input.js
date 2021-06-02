import React from 'react';

import styles from './food-input.module.css';

export default function FoodInput({
  name,
  label,
  type,
  value,
  handleInputChange,
  disabled,
}) {
  return (
    <>
      <label
        className={`${styles.foodRow} ${type === 'checkbox' && styles.short}`}>
        <span
          className={`${styles.foodLabel} ${
            (type === 'text' || type === 'number') && styles.above
          }`}>
          {label}
        </span>
        <input
          className={`${styles.foodInput}`}
          name={name}
          type={type}
          value={value}
          checked={value}
          onChange={handleInputChange}
          placeholder={`${label} cannot be ${
            type === 'number' ? 'zero' : 'blank'
          }`}
          disabled={disabled}
        />
      </label>
    </>
  );
}
