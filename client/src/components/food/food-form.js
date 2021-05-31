import React, { useState } from 'react';
import FoodSubmit from './food-submit';
import FoodInput from './food-input';

export default function FoodForm() {
  const [formData, setFormData] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FoodInput name="name" type="text" />
        <FoodSubmit />
      </form>
    </>
  );
}
