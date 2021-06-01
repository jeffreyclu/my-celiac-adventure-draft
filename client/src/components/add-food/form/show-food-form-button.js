import React from 'react';

import { useGlobalState } from '../../../state';

import styles from './show-food-form-button.module.css';

export default function ShowFoodFormButton() {
  const [showForm, setShowForm] = useGlobalState('showForm');
  return (
    <button
      className={styles.showFoodFormButton}
      onClick={() => setShowForm(true)}
      disabled={showForm}>
      Add a dish
    </button>
  );
}
