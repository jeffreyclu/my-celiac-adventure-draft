import React, { useEffect } from 'react';

import BaseFlipForm from './base-flip-form';
import BaseInput from './base-input';
import BaseSubmit from './base-submit';
import { baseFormLabels } from './constants';
import { useGlobalState } from '../../state';

import styles from './base-form.module.css';

export default function BaseForm({ handleFormSubmit }) {
  const [, setUserFormDisabled] = useGlobalState('userFormDisabled');
  const [userFormData, setUserFormData] = useGlobalState('userFormData');

  const validateForm = () => {
    const activeInputs = formInputs.filter((input) => input !== null);
    for (let i = 0; i < activeInputs.length; i += 1) {
      const { type, value } = activeInputs[i].props;
      // ignore checkboxes and check for blanks
      if (type !== 'checkbox' && !value) {
        return setUserFormDisabled(true);
      }
    }
    return setUserFormDisabled(false);
  };

  useEffect(() => {
    validateForm();
  });

  const handleInputChange = (e) => {
    let value = e.target.value;
    // make sure we are using the right value type
    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    } else if (e.target.type === 'number') {
      value = parseInt(e.target.value);
    }
    setUserFormData({
      ...userFormData,
      [e.target.name]: value,
    });
  };

  const formInputs = Object.entries(userFormData)?.map(([key], i) => {
    // render inputs dynamically based on form data structure
    let type = 'text';
    if (key === 'email' || key === 'password') {
      type = key;
    }
    return (
      <BaseInput
        key={`Base Input ${i}`}
        name={key}
        label={baseFormLabels[key]}
        type={type}
        value={userFormData[key]}
        handleInputChange={handleInputChange}
        disabled={key === 'tags'}
      />
    );
  });

  return (
    <form className={styles.baseForm} onSubmit={handleFormSubmit}>
      {formInputs}
      <section className={styles.baseButtons}>
        <BaseSubmit />
        <BaseFlipForm />
      </section>
    </form>
  );
}
