import React, { useEffect, useState } from 'react';

import FoodTag from './food-tag';
import { useGlobalState } from '../../../state';

import styles from './food-tags.module.css';
import { checkCache } from '../../../utils';

export default function FoodTags() {
  const [fetchedTags, setFetchedTags] = useState(false);
  const [formTags, setFormTags] = useState([]);
  const [setAddFoodFormError] = useGlobalState('addFoodFormError');

  const fetchTags = async () => {
    // check if local cache is still valid
    const isCacheValid = await checkCache('tags');
    // check cache
    if (isCacheValid) {
      if (localStorage.getItem('tags')) {
        const cachedTags = JSON.parse(localStorage.getItem('tags'));
        setFormTags(cachedTags.data);
        return setFetchedTags(true);
      }
    }

    // otherwise make fresh data request
    const req = await fetch('/api/tag/all');
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
      localStorage.setItem('tags', JSON.stringify(cache));
      setFormTags(data);
      setFetchedTags(true);
    } else {
      setAddFoodFormError(`Error: ${data}. Please try again later.`);
      setFetchedTags(false);
    }
  };

  useEffect(() => {
    if (!fetchedTags) {
      fetchTags();
    }
  });

  const tagsList = formTags?.map(({ tag }, i) => {
    return <FoodTag key={`Tag_${i}`} tag={tag} />;
  });

  return (
    <>
      <section className={styles.foodTags}>{tagsList}</section>
    </>
  );
}
