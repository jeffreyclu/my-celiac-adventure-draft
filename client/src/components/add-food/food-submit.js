import React from 'react';

export default function FoodSubmit({ formDisabled }) {
  return <input type="submit" value="Submit" disabled={formDisabled} />;
}
