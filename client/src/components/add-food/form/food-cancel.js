import React from 'react';

import { useGlobalState } from '../../../state';

export default function FoodCancel() {
  const [, setAddFoodFormSelectedFood] = useGlobalState(
    'addFoodFormSelectedFood',
  );
  const [, setShowAddFoodForm] = useGlobalState('showAddFoodForm');
  const [, setAddFoodFormDisabled] = useGlobalState('addFoodFormDisabled');

  const handleClick = () => {
    setAddFoodFormSelectedFood('');
    setShowAddFoodForm(false);
    setAddFoodFormDisabled(true);
  };

  return <button onClick={handleClick}>Cancel</button>;
}
