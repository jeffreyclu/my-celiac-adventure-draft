import React from 'react';

import { useGlobalState } from '../../../state';
import { addFoodFormBaseData } from '../constants';

import styles from './food-item-overlay.module.css';

export default function FoodItemOverlay({ _id }) {
  const [, setAddFoodFormError] = useGlobalState('addFoodFormError');
  const [, setAddFoodFormData] = useGlobalState('addFoodFormData');
  const [, setAddFoodFormEditable] = useGlobalState('addFoodFormEditable');
  const [, setShowAddFoodForm] = useGlobalState('showAddFoodForm');
  const [, setAddFoodFormFetched] = useGlobalState('addFoodFormFetched');
  const [, setAddFoodFormSuccess] = useGlobalState('addFoodFormSuccess');
  const [, setAddFoodFormSelectedFood] = useGlobalState(
    'addFoodFormSelectedFood',
  );

  const handleClickEdit = async () => {
    const req = await fetch(`/api/food/one/${_id}`);
    if (!req.ok) {
      const { status, statusText } = req;
      return setAddFoodFormError(
        `${status} error: ${statusText}. Please try again later.`,
      );
    }
    const resp = await req.json();
    const { success, data } = resp;
    if (success) {
      // filter out mongoDB _ keys
      const filtered = Object.entries(data)?.filter(([key]) => !/_/.test(key));
      // map fetched data to form data shape
      const mapped = Object.assign({}, addFoodFormBaseData);
      for (let i = 0; i < filtered.length; i += 1) {
        const [key, value] = filtered[i];
        mapped[key] = value;
      }
      setAddFoodFormSelectedFood(_id);
      setAddFoodFormData(mapped);
      setAddFoodFormEditable(true);
      setShowAddFoodForm(true);
    } else {
      setAddFoodFormError(`Error: ${data}. Please try again later.`);
    }
  };

  const handleClickDelete = async () => {
    const req = await fetch(`/api/food/one/${_id}`, {
      method: 'DELETE',
    });
    if (!req.ok) {
      const { status, statusText } = req;
      return setAddFoodFormError(
        `${status} error: ${statusText}. Please try again later.`,
      );
    }
    const resp = await req.json();
    const { success, data } = resp;
    if (success) {
      setAddFoodFormFetched(false);
      setAddFoodFormSuccess(`Success: ${data.name} was deleted.`);
    } else {
      setAddFoodFormError(`Error: ${data}. Please try again later.`);
    }
  };

  return (
    <section className={styles.foodItemOverlay}>
      <button onClick={handleClickEdit}>Edit</button>
      <button onClick={handleClickDelete}>Delete</button>
    </section>
  );
}
