import React from 'react';

import { foodLabels } from './constants';

import styles from './food-list.module.css';

export default function FoodListHeaders() {
  const foodListHeaders = Object.values(foodLabels)
    ?.filter((label) => !/Explanation/.test(label))
    ?.map((header, i) => (
      <span className={styles.foodListFields} key={`Header_${i}`}>
        {header}
      </span>
    ));
  return <section className={styles.foodListItem}>{foodListHeaders}</section>;
}
