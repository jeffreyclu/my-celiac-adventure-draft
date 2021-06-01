import React from 'react';

import styles from './food-input.module.css';

export default function FoodInput({
  name,
  label,
  type,
  value,
  handleInputChange,
}) {
  return (
    <>
      <label className={styles.foodRow}>
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
          onChange={handleInputChange}
          placeholder={`${label} cannot be ${
            type === 'number' ? 'zero' : 'blank'
          }`}
        />
      </label>
    </>
  );
}
