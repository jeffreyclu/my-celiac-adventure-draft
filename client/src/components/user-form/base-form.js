import React from 'react';
import BaseFlipForm from './base-flip-form';
import BaseInput from './base-input';
import BaseSubmit from './base-submit';

import styles from './base-form.module.css';

export default function BaseForm({
  formType,
  handleFormSubmit,
  handleInputChange,
  formData,
}) {
  return (
    <form className={styles.baseForm} onSubmit={handleFormSubmit}>
      <BaseInput
        label="Username"
        type="text"
        name="username"
        value={formData?.username}
        handleInputChange={handleInputChange}
      />
      {formType === 'register' && (
        <BaseInput
          label="Email"
          type="email"
          name="email"
          value={formData?.email}
          handleInputChange={handleInputChange}
        />
      )}
      <BaseInput
        label="Password"
        type="password"
        name="password"
        value={formData?.password}
        handleInputChange={handleInputChange}
      />
      <section className={styles.baseButtons}>
        <BaseSubmit />
        <BaseFlipForm />
      </section>
    </form>
  );
}
