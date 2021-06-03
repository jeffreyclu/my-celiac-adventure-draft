import React, { useCallback, useEffect } from 'react';

import FoodSubmit from './food-submit';
import FoodCancel from './food-cancel';
import FoodInput from './food-input';
import FoodTags from './food-tags';
import { addFoodLabels, addFoodFormBaseData } from '../constants';
import { useGlobalState } from '../../../state';

import styles from './food-form.module.css';

export default function FoodForm() {
  const [, setAddFoodFormFetched] = useGlobalState('addFoodFormFetched');
  const [, setAddFoodFormDisabled] = useGlobalState('addFoodFormDisabled');
  const [, setShowAddFoodForm] = useGlobalState('showAddFoodForm');
  const [, setAddFoodFormError] = useGlobalState('addFoodFormError');
  const [, setAddFoodFormSuccess] = useGlobalState('addFoodFormSuccess');
  const [addFoodFormEditable] = useGlobalState('addFoodFormEditable');
  const [addFoodFormData, setAddFoodFormData] =
    useGlobalState('addFoodFormData');
  const [addFoodFormSelectedFood, setAddFoodFormSelectedFood] = useGlobalState(
    'addFoodFormSelectedFood',
  );

  const resetFormData = useCallback(() => {
    setAddFoodFormData(addFoodFormBaseData);
  }, [setAddFoodFormData]);

  // generate a blank form if not editing an existing food
  useEffect(() => {
    if (!addFoodFormEditable) {
      resetFormData();
    }
  }, [resetFormData, addFoodFormEditable]);

  const validateForm = () => {
    // filter out unused inputs
    const activeInputs = foodInputs.filter((input) => input !== null);
    for (let i = 0; i < activeInputs.length; i += 1) {
      const { type, value } = activeInputs[i].props;
      // ignore checkboxes and check for blanks
      if (type !== 'checkbox' && !value) {
        return setAddFoodFormDisabled(true);
      }
    }
    return setAddFoodFormDisabled(false);
  };

  // validate form on every change
  useEffect(() => {
    validateForm();
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setAddFoodFormDisabled(true);
    let req;
    if (!addFoodFormEditable) {
      // if not editing existing data, send new POST request
      req = await fetch('/api/food/one', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addFoodFormData),
      });
    } else {
      // otherwise, send PUT request
      req = await fetch(`/api/food/one/${addFoodFormSelectedFood}`, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addFoodFormData),
      });
    }

    if (!req.ok) {
      const { status, statusText } = req;
      return setAddFoodFormError(
        `${status} error: ${statusText}. Please try again later.`,
      );
    }

    const resp = await req.json();

    if (resp.success) {
      resetFormData();
      setAddFoodFormFetched(false);
      setShowAddFoodForm(false);
      setAddFoodFormSelectedFood('');
      return setAddFoodFormSuccess(`Success: ${resp.data.name} was edited.`);
    } else {
      setAddFoodFormDisabled(false);
      return setAddFoodFormError(
        `Error: ${resp.error}. Please try again later.`,
      );
    }
  };

  const handleInputChange = (e) => {
    let value = e.target.value;
    // make sure we are using the right value type
    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    } else if (e.target.type === 'number') {
      value = parseInt(e.target.value);
    }
    setAddFoodFormData({
      ...addFoodFormData,
      [e.target.name]: value,
    });
  };

  const foodInputs = Object.entries(addFoodFormData)
    // filter out mongoDB _ keys
    ?.filter(([key]) => !/_/.test(key))
    ?.map(([key, value]) => {
      // render inputs dynamically based on form data structure
      let type = 'text';
      // assign different input type based on input value type
      if (typeof value === 'boolean') {
        type = 'checkbox';
      } else if (typeof value === 'number') {
        type = 'number';
      }
      // hide explanation inputs if not applicable
      if (key === 'glutenExplanation' && !addFoodFormData['gluten']) {
        return null;
      }
      if (key === 'fructoseExplanation' && !addFoodFormData['fructose']) {
        return null;
      }
      if (key === 'lactoseExplanation' && !addFoodFormData['lactose']) {
        return null;
      }
      return (
        <FoodInput
          key={key}
          name={key}
          label={addFoodLabels[key]}
          type={type}
          value={addFoodFormData[key]}
          handleInputChange={handleInputChange}
          disabled={key === 'tags'}
        />
      );
    });

  return (
    <>
      <div className={styles.foodFormModalOverlay} />
      <article className={styles.foodFormModal}>
        <div className={styles.foodFormContainer}>
          <h2>{addFoodFormEditable ? 'Edit a dish' : 'Add a dish'}</h2>
          <form className={styles.foodForm} onSubmit={handleFormSubmit}>
            {foodInputs}
            <FoodTags />
            <section className={styles.foodButtons}>
              <FoodSubmit />
              <FoodCancel />
            </section>
          </form>
        </div>
      </article>
    </>
  );
}
