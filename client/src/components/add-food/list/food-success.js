import React from 'react';

import { useGlobalState } from '../../../state';

import styles from './food-success.module.css';

export default function FoodSuccess() {
  const [addFoodFormSuccess] = useGlobalState('addFoodFormSuccess');
  return <span className={styles.foodSuccess}>{addFoodFormSuccess}</span>;
}
