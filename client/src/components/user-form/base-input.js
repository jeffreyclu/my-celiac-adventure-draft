import React from 'react';

import styles from './base-input.module.css';

export default function BaseInput({
  label,
  name,
  type,
  value,
  handleInputChange,
  disabled,
}) {
  return (
    <label className={styles.baseInputRow}>
      <span className={`${styles.baseLabel} ${styles.above}`}>{label}</span>
      <input
        className={styles.baseInput}
        name={name}
        type={type}
        value={value}
        placeholder={`${label} cannot be ${
          type === 'number' ? 'zero' : 'blank'
        }`}
        onChange={handleInputChange}
        disabled={disabled}></input>
    </label>
  );
}
