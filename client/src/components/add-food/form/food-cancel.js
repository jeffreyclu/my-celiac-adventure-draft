import React from 'react';

import { useGlobalState } from '../../../state';

export default function FoodCancel() {
  const [, setShowForm] = useGlobalState('showForm');
  const [, setFormDisabled] = useGlobalState('formDisabled');

  const handleClick = () => {
    setShowForm(false);
    setFormDisabled(true);
  };

  return <button onClick={handleClick}>Cancel</button>;
}
