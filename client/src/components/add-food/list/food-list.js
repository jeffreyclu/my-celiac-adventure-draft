import React, { useEffect, useState } from 'react';

import FoodError from './food-error';
import FoodSuccess from './food-success';
import FoodListHeaders from './food-list-headers';
import FoodListItems from './food-list-items';
import FoodLoading from './food-loading';
import { useGlobalState } from '../../../state';

import styles from './food-list.module.css';

export default function FoodList() {
  const [, setFoods] = useGlobalState('foods');
  const [fetched, setFetched] = useGlobalState('fetched');
  const [error, setError] = useGlobalState('error');
  const [success] = useGlobalState('success');

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
      fetchFoods();
    }
  });

  return (
    <article className={styles.foodList}>
      <h2>Submitted Dishes</h2>
      {error && <FoodError />}
      <FoodListHeaders />
      {fetched ? <FoodListItems /> : <FoodLoading />}
      {success && <FoodSuccess />}
    </article>
  );
}
