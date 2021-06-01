import React from 'react';

import styles from './food-list.module.css';

export default function FoodListItem({ food }) {
  // filter out unused fields (explanation fields and mongoDB fields)
  const foodFields = Object.entries(food)
    ?.filter(([key]) => !/Explanation|_/.test(key))
    ?.map(([key, value], i) => (
      <span key={`Value_${i}`} className={styles.foodListFields}>
        {typeof value === 'string' ? value : JSON.stringify(value)}
      </span>
    ));
  return <article className={styles.foodListItem}>{foodFields}</article>;
}
