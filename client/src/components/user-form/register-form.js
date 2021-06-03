import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useGlobalState } from '../../state';
import { isAdminAuthorized } from '../auth/utils';

import BaseForm from './base-form';

export default function RegisterForm({ adminRequired }) {
  const [registerFormData, setRegisterFormData] =
    useGlobalState('registerFormData');
  const [registerFormError, setRegisterFormError] =
    useGlobalState('registerFormError');
  const [registerFormSuccess, setRegisterFormSuccess] = useGlobalState(
    'registerFormSuccess',
  );
  const [, setRegisterFormDisabled] = useGlobalState('registerFormDisabled');
  const [, setLoggedIn] = useGlobalState('loggedIn');
  const history = useHistory();
  const historyState = useLocation();
  const [loaded, setLoaded] = useState(false);

  const resetFormData = useCallback(() => {
    setRegisterFormData({
      username: '',
      email: '',
      password: '',
    });
    setRegisterFormDisabled(false);
  }, [setRegisterFormData, setRegisterFormDisabled]);

  useEffect(() => {
    if (registerFormSuccess) {
      setTimeout(() => setRegisterFormSuccess(''), 3000);
    }
    if (registerFormError) {
      setTimeout(() => setRegisterFormError(''), 5000);
    }
  });

  useEffect(() => {
    if (!loaded) {
      resetFormData();
      setLoaded(true);
    }
  }, [setLoaded, loaded, resetFormData]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterFormDisabled(true);
    const req = await fetch('/api/register', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerFormData),
    });

    if (!req.status === 201) {
      console.log(req);
      const { status, message } = req;
      resetFormData();
      return setRegisterFormError(`${status} error: ${message}.`);
    }

    const resp = await req.json();

    if (!resp.success) {
      resetFormData();
      return setRegisterFormError(
        `Error: ${resp.error}. Please try again later.`,
      );
    }

    setLoggedIn(true);
    resetFormData();
    setRegisterFormSuccess(`Success: logged in.`);
    return history.push(historyState?.state?.from?.pathname || '/');
  };

  const handleRegisterInputChange = (e) => {
    let value = e.target.value;
    // make sure we are using the right value type
    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    } else if (e.target.type === 'number') {
      value = parseInt(e.target.value);
    }
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: value,
    });
  };

  return (
    <>
      {loaded && (
        <BaseForm
          formType="register"
          handleFormSubmit={handleRegister}
          handleInputChange={handleRegisterInputChange}
          formData={registerFormData}
        />
      )}
      {registerFormSuccess && <span>{registerFormSuccess}</span>}
      {registerFormError && <span>{registerFormError}</span>}
    </>
  );
}
