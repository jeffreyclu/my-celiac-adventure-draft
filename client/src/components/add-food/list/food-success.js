import React from 'react';

import { useGlobalState } from '../../../state';

import styles from './food-success.module.css';

export default function FoodSuccess() {
  const [success] = useGlobalState('success');
  return <span className={styles.foodSuccess}>{success}</span>;
}
