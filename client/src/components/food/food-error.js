import React from 'react';

import styles from './food-error.module.css';

export default function FormError({ error }) {
  return <span className={styles.foodError}>{error}</span>;
}
