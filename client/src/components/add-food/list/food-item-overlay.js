import React from 'react';

import { useGlobalState } from '../../../state';
import { baseFormData } from '../constants';

import styles from './food-item-overlay.module.css';

export default function FoodItemOverlay({ _id }) {
  const [, setError] = useGlobalState('error');
  const [, setFormData] = useGlobalState('formData');
  const [, setFormEditable] = useGlobalState('formEditable');
  const [, setShowForm] = useGlobalState('showForm');
  const [, setFetched] = useGlobalState('fetched');
  const [, setSuccess] = useGlobalState('success');
  const [, setFood] = useGlobalState('food');

  const handleClickEdit = async () => {
    const req = await fetch(`/api/food/one/${_id}`);
    if (!req.ok) {
      const { status, statusText } = req;
      return setError(
        `${status} error: ${statusText}. Please try again later.`,
      );
    }
    const resp = await req.json();
    const { success, data } = resp;
    if (success) {
      // filter out mongoDB _ keys
      const filtered = Object.entries(data)?.filter(([key]) => !/_/.test(key));
      // map fetched data to form data shape
      const mapped = Object.assign({}, baseFormData);
      for (let i = 0; i < filtered.length; i += 1) {
        const [key, value] = filtered[i];
        mapped[key] = value;
      }
      setFood(_id);
      setFormData(mapped);
      setFormEditable(true);
      setShowForm(true);
    } else {
      setError(`Error: ${data}. Please try again later.`);
    }
  };

  const handleClickDelete = async () => {
    const req = await fetch(`/api/food/one/${_id}`, {
      method: 'DELETE',
    });
    if (!req.ok) {
      const { status, statusText } = req;
      return setError(
        `${status} error: ${statusText}. Please try again later.`,
      );
    }
    const resp = await req.json();
    const { success, data } = resp;
    if (success) {
      setFetched(false);
      setSuccess(`Success: ${data.name} was deleted.`);
    } else {
      setError(`Error: ${data}. Please try again later.`);
    }
  };

  return (
    <section className={styles.foodItemOverlay}>
      <button onClick={handleClickEdit}>Edit</button>
      <button onClick={handleClickDelete}>Delete</button>
    </section>
  );
}
