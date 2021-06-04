import React from 'react';
import { useGlobalState } from '../../state';

import styles from './base-input.module.css';

export default function BaseInput({
  label,
  name,
  type,
  value,
  handleInputChange,
}) {
  const [userFormInputDisabled] = useGlobalState('userFormInputDisabled');
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
        disabled={userFormInputDisabled}></input>
    </label>
  );
}
