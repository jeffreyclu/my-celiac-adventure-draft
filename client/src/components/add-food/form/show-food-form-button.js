import React from 'react';

import { useGlobalState } from '../../../state';

import styles from './show-food-form-button.module.css';

export default function ShowFoodFormButton() {
  const [showAddFoodForm, setShowAddFoodForm] =
    useGlobalState('showAddFoodForm');
  const [, setAddFoodFormEditable] = useGlobalState('addFoodFormEditable');
  const [, setShowAddFoodFormItemOverlay] = useGlobalState(
    'showAddFoodFormItemOverlay',
  );

  const handleShowFormClick = () => {
    setAddFoodFormEditable(false);
    setShowAddFoodForm(true);
    setShowAddFoodFormItemOverlay(-1);
  };
  return (
    <button
      className={styles.showFoodFormButton}
      onClick={handleShowFormClick}
      disabled={showAddFoodForm}>
      Add a dish
    </button>
  );
}
