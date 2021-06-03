import React from 'react';

import FoodForm from '../../components/add-food/form/food-form';
import FoodList from '../../components/add-food/list/food-list';
import ShowFoodFormButton from '../../components/add-food/form/show-food-form-button';
import { useGlobalState } from '../../state';
import Nav from '../../components/nav/nav';

const AddFood = () => {
  const [showAddFoodForm] = useGlobalState('showAddFoodForm');
  return (
    <>
      <Nav />
      <FoodList />
      {!showAddFoodForm && <ShowFoodFormButton />}
      {showAddFoodForm && <FoodForm />}
    </>
  );
};

export default AddFood;
