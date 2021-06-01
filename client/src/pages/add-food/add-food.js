import React from 'react';
import FoodForm from '../../components/add-food/form/food-form';
import FoodList from '../../components/add-food/list/food-list';

import styles from './add-food.module.css';

export default function AddFood() {
  return (
    <article className={styles.food}>
      <h2 className={styles.heading}>Submit a new dish</h2>
      <FoodForm />
      <FoodList />
    </article>
  );
}
