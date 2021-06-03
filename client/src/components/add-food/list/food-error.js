import React from 'react';

import { useGlobalState } from '../../../state';

import styles from './food-error.module.css';

export default function FormError() {
  const [addFoodFormError] = useGlobalState('addFoodFormError');
  return <span className={styles.foodError}>{addFoodFormError}</span>;
}
