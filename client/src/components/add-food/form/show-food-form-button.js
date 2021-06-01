import React from 'react';

import { useGlobalState } from '../../../state';

import styles from './show-food-form-button.module.css';

export default function ShowFoodFormButton() {
  const [showForm, setShowForm] = useGlobalState('showForm');
  const [, setFormEditable] = useGlobalState('formEditable');
  const [, setShowFoodItemOverlay] = useGlobalState('showFormItemOverlay');

  const handleShowFormClick = () => {
    setFormEditable(false);
    setShowForm(true);
    setShowFoodItemOverlay(-1);
  };
  return (
    <button
      className={styles.showFoodFormButton}
      onClick={handleShowFormClick}
      disabled={showForm}>
      Add a dish
    </button>
  );
}
