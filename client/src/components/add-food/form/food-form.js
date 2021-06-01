import React, { useEffect, useState } from 'react';

import FoodSubmit from './food-submit';
import FoodCancel from './food-cancel';
import FoodInput from './food-input';
import { foodLabels } from '../constants';
import { useGlobalState } from '../../../state';

import styles from './food-form.module.css';

export default function FoodForm() {
  const [, setFetched] = useGlobalState('fetched');
  const [, setFormDisabled] = useGlobalState('formDisabled');
  const [, setShowForm] = useGlobalState('showForm');
  const [, setError] = useGlobalState('error');
  const [, setSuccess] = useGlobalState('success');
  const [formData, setFormData] = useState({});

  useEffect(() => {
    resetFormData();
  }, [setFormData]);

  const resetFormData = () => {
    setFormData({
      name: '',
      description: '',
      gluten: false,
      glutenExplanation: '',
      fructose: false,
      fructoseExplanation: '',
      lactose: false,
      lactoseExplanation: '',
      price: 1,
      baseHunger: 1,
      baseHealth: 1,
    });
  };

  useEffect(() => {
    validateForm();
  });

  const validateForm = () => {
    // filter out unused inputs
    const activeInputs = foodInputs.filter((input) => input !== null);
    for (let i = 0; i < activeInputs.length; i += 1) {
      const { type, value } = activeInputs[i].props;
      // ignore checkboxes and check for blanks
      if (type !== 'checkbox' && !value) {
        return setFormDisabled(true);
      }
    }
    return setFormDisabled(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormDisabled(true);
    const req = await fetch('/api/food/one', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const resp = await req.json();
    if (resp.success) {
      resetFormData();
      setFetched(false);
      setShowForm(false);
      return setSuccess(`Success: ${resp.data.name} was created.`);
    } else {
      setFormDisabled(false);
      return setError(`Error: ${resp.error}. Please try again later.`);
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
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const foodInputs = Object.entries(formData).map(([key, value]) => {
    // render inputs based on formData data structure
    let type = 'text';
    // assign different input type based on input value type
    if (typeof value === 'boolean') {
      type = 'checkbox';
    } else if (typeof value === 'number') {
      type = 'number';
    }
    // hide explanation inputs if not applicable
    if (key === 'glutenExplanation' && !formData['gluten']) {
      return null;
    }
    if (key === 'fructoseExplanation' && !formData['fructose']) {
      return null;
    }
    if (key === 'lactoseExplanation' && !formData['lactose']) {
      return null;
    }
    return (
      <FoodInput
        key={key}
        name={key}
        label={foodLabels[key]}
        type={type}
        value={formData[key]}
        handleInputChange={handleInputChange}
      />
    );
  });

  return (
    <>
      <div className={styles.foodFormModalOverlay} />
      <article className={styles.foodFormModal}>
        <div className={styles.foodFormContainer}>
          <h2>Add a dish</h2>
          <form className={styles.foodForm} onSubmit={handleFormSubmit}>
            {foodInputs}
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
