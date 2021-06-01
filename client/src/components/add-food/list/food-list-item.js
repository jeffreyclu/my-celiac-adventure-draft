import React from 'react';

import styles from './food-list.module.css';

export default function FoodListItem({ food }) {
  // filter out unused fields (explanation fields and mongoDB fields)
  const foodFields = Object.entries(food)
    ?.filter(([key]) => !/Explanation|_/.test(key))
    ?.map(([key, value], i) => {
      let formatted = value;
      if (typeof value === 'string' && value.length > 32) {
        formatted = value.slice(0, 29) + `...`;
      }
      return (
        <span key={`Value_${i}`} className={styles.foodListFields}>
          {typeof value === 'string' ? formatted : JSON.stringify(value)}
        </span>
      );
    });
  return <article className={styles.foodListItem}>{foodFields}</article>;
}
