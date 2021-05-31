import React, { useState } from 'react';
import FoodSubmit from './food-submit';

export default function FoodForm() {
  const [formData, setFormData] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FoodSubmit />
      </form>
    </>
  )
}