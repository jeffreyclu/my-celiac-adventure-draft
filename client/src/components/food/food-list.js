import React, { useEffect, useState } from 'react';

import FoodError from './food-error';
import FoodListHeaders from './food-list-headers';
import FoodListItems from './food-list-items';

import styles from './food-list.module.css';

export default function FoodList() {
  const [foods, setFoods] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState(false);
  const fetchFoods = async () => {
    const req = await fetch('/api/food/all');
    if (!req.ok) {
      const { status, statusText } = req;
      return setError(
        `${status} error: ${statusText}. Please try again later.`,
      );
    }
    const resp = await req.json();
    const { success, data } = resp;
    if (success) {
      setFoods(data);
      setFetched(true);
    } else {
      setError(`Error: ${data}. Please try again later.`);
      setFetched(false);
    }
  };
  useEffect(() => {
    if (!fetched) {
      setTimeout(fetchFoods, 1000);
    }
  }, [fetched]);

  return (
    <article className={styles.foodList}>
      <h2>Submitted Dishes</h2>
      {error && <FoodError error={error} />}
      <FoodListHeaders />
      <FoodListItems foods={foods} />
    </article>
  );
}
