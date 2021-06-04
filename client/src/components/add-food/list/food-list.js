import React, { useEffect } from 'react';

import FoodError from './food-error';
import FoodSuccess from './food-success';
import FoodListHeaders from './food-list-headers';
import FoodListItems from './food-list-items';
import FoodLoading from './food-loading';
import { useGlobalState } from '../../../state';

import styles from './food-list.module.css';
import { checkCache } from '../../../utils';

export default function FoodList() {
  const [, setAddFoodFormFoods] = useGlobalState('addFoodFormFoods');
  const [addFoodFormFetched, setAddFoodFormFetched] =
    useGlobalState('addFoodFormFetched');
  const [addFoodFormError, setAddFoodFormError] =
    useGlobalState('addFoodFormError');
  const [addFoodFormSuccess, setAddFoodFormSuccess] =
    useGlobalState('addFoodFormSuccess');

  const fetchFoods = async () => {
    // check if local cache is still valid
    const isCacheValid = await checkCache('foods');
    // check the cache
    if (isCacheValid) {
      if (localStorage.getItem('foods')) {
        const cachedFoods = JSON.parse(localStorage.getItem('foods'));
        setAddFoodFormFoods(cachedFoods.data);
        return setAddFoodFormFetched(true);
      }
    }
    // otherwise get fresh data
    const req = await fetch('/api/food/all');
    if (!req.ok) {
      const { status, statusText } = req;
      return setAddFoodFormError(
        `${status} error: ${statusText}. Please try again later.`,
      );
    }
    const resp = await req.json();
    const { success, data } = resp;
    if (success) {
      // first cache the data
      const cache = { data, lastUpdated: Date.now() };
      localStorage.setItem('foods', JSON.stringify(cache));
      setAddFoodFormFoods(data);
      setAddFoodFormFetched(true);
    } else {
      setAddFoodFormError(`Error: ${data}. Please try again later.`);
      setAddFoodFormFetched(false);
    }
  };

  useEffect(() => {
    if (!addFoodFormFetched) {
      fetchFoods();
    }
  });

  useEffect(() => {
    if (addFoodFormSuccess) {
      setTimeout(() => setAddFoodFormSuccess(''), 3000);
    }
    if (addFoodFormError) {
      setTimeout(() => setAddFoodFormError(''), 5000);
    }
  });

  return (
    <article className={styles.foodList}>
      <h2>Submitted Dishes</h2>
      <FoodListHeaders />
      {addFoodFormFetched ? <FoodListItems /> : <FoodLoading />}
      {addFoodFormError && <FoodError />}
      {addFoodFormSuccess && <FoodSuccess />}
    </article>
  );
}
