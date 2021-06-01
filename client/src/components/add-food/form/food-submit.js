import React from 'react';

import { useGlobalState } from '../../../state';

export default function FoodSubmit() {
  const [formDisabled] = useGlobalState('formDisabled');
  return <input type="submit" value="Submit" disabled={formDisabled} />;
}
