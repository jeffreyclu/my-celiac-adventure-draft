import React, { useEffect, useState } from 'react';

import FoodTag from './food-tag';
import { useGlobalState } from '../../../state';

import styles from './food-tags.module.css';

export default function FoodTags() {
  const [fetchedTags, setFetchedTags] = useState(false);
  const [formTags, setFormTags] = useState([]);
  const [setError] = useGlobalState('error');

  const fetchTags = async () => {
    // check cache
    if (localStorage.getItem('tags')) {
      const cachedTags = JSON.parse(localStorage.getItem('tags'));
      setFormTags(cachedTags);
      return setFetchedTags(true);
    }

    // otherwise make fresh data request
    const req = await fetch('/api/tag/all');
    if (!req.ok) {
      const { status, statusText } = req;
      return setError(
        `${status} error: ${statusText}. Please try again later.`,
      );
    }
    const resp = await req.json();
    const { success, data } = resp;

    if (success) {
      // first cache the data
      localStorage.setItem('tags', JSON.stringify(data));
      setFormTags(data);
      setFetchedTags(true);
    } else {
      setError(`Error: ${data}. Please try again later.`);
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