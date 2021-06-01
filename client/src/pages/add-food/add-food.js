import React from 'react';

import FoodForm from '../../components/add-food/form/food-form';
import FoodList from '../../components/add-food/list/food-list';
import ShowFoodFormButton from '../../components/add-food/form/show-food-form-button';
import { useGlobalState } from '../../state';

import styles from './add-food.module.css';

const AddFood = () => {
  const [showForm] = useGlobalState('showForm');
  return (
    <article className={styles.addFoodContainer}>
      <FoodList />
      {!showForm && <ShowFoodFormButton />}
      {showForm && <FoodForm />}
    </article>
  );
};

export default AddFood;
