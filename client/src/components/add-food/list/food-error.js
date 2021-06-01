import React from 'react';

import { useGlobalState } from '../../../state';

import styles from './food-error.module.css';

export default function FormError() {
  const [error] = useGlobalState('error');
  return <span className={styles.foodError}>{error}</span>;
}
