import React from 'react';
import FoodForm from '../../components/food/food-form';
import FoodList from '../../components/food/food-list';

import styles from './food.module.css';

export default function AddFood() {
  return (
    <article className={styles.food}>
      <h2 className={styles.heading}>Submit a new dish</h2>
      <FoodForm />
      <FoodList />
    </article>
  );
}
