import React from 'react';

import FoodListItem from './food-list-item';

import styles from './food-list.module.css';

export default function FoodListItems({ foods }) {
  const foodListItems = foods?.map((food, i) => {
    return <FoodListItem key={`Item_${i}`} food={food} />;
  });
  return <section className={styles.foodListItems}>{foodListItems}</section>;
}
