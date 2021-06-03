import React from 'react';

import FoodItemOverlay from './food-item-overlay';
import { useGlobalState } from '../../../state';

import styles from './food-list.module.css';

export default function FoodListItem({ food, index }) {
  const { _id } = food;

  const [showAddFoodFormItemOverlay, setShowAddFoodFormItemOverlay] =
    useGlobalState('showAddFoodFormItemOverlay');

  const handleShowFoodItemOverlay = () => {
    if (showAddFoodFormItemOverlay === index) {
      return setShowAddFoodFormItemOverlay(-1);
    }
    return setShowAddFoodFormItemOverlay(index);
  };

  // filter out unused fields (explanation fields and mongoDB fields)
  const foodFields = Object.entries(food)
    ?.filter(([key]) => !/Explanation|_/.test(key))
    ?.map(([key, value], i) => {
      let formatted = value;
      if (typeof value === 'string' && value.length > 32) {
        formatted = value.slice(0, 29) + `...`;
      }
      return (
        <span
          key={`Value_${i}`}
          className={`${styles.foodListFields} ${
            value === true && styles.green
          }`}>
          {typeof value === 'string' ? formatted : JSON.stringify(value)}
        </span>
      );
    });

  return (
    <article
      onClick={handleShowFoodItemOverlay}
      className={styles.foodListItem}>
      {foodFields}
      {showAddFoodFormItemOverlay === index && <FoodItemOverlay _id={_id} />}
    </article>
  );
}
