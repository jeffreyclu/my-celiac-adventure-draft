import React from 'react';

import { useGlobalState } from '../../../state';

export default function FoodSubmit() {
  const [addFoodFormDisabled] = useGlobalState('addFoodFormDisabled');
  return <input type="submit" value="Submit" disabled={addFoodFormDisabled} />;
}
