import React from 'react';

import FoodListItem from './food-list-item';
import { useGlobalState } from '../../../state';

import styles from './food-list.module.css';

export default function FoodListItems() {
  const [foods] = useGlobalState('foods');
  const foodListItems = foods?.map((food, i) => {
    return <FoodListItem key={`Item_${i}`} food={food} index={i} />;
  });
  return <section className={styles.foodListItems}>{foodListItems}</section>;
}
