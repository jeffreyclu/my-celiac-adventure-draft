import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

import BaseForm from './base-form';
import { registerFormBaseData } from './constants';
import { useGlobalState } from '../../state';

export default function RegisterForm() {
  const [userFormData, setUserFormData] = useGlobalState('userFormData');
  const [userFormError, setUserFormError] = useGlobalState('userFormError');
  const [userFormSuccess, setUserFormSuccess] =
    useGlobalState('userFormSuccess');
  const [, setUserFormDisabled] = useGlobalState('userFormDisabled');
  const [, setLoggedIn] = useGlobalState('loggedIn');
  const [, setCurrentUser] = useGlobalState('currentUser');
  const history = useHistory();
  const historyState = useLocation();
  const [loaded, setLoaded] = useState(false);

  const resetFormData = useCallback(() => {
    setUserFormData(registerFormBaseData);
    setUserFormDisabled(false);
  }, [setUserFormData, setUserFormDisabled]);

  useEffect(() => {
    if (userFormSuccess) {
      setTimeout(() => setUserFormSuccess(''), 3000);
    }
    if (userFormError) {
      setTimeout(() => setUserFormError(''), 5000);
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
    setUserFormDisabled(true);
    const req = await fetch('/api/register', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userFormData),
    });

    if (!req.status === 201) {
      const { status, message } = req;
      resetFormData();
      return setUserFormError(`${status} error: ${message}.`);
    }

    const resp = await req.json();

    if (!resp.success) {
      resetFormData();
      return setUserFormError(`Error: ${resp.error}. Please try again later.`);
    }

    setLoggedIn(true);
    setCurrentUser(resp.data);
    resetFormData();
    setUserFormSuccess(`Successfully registered user ${resp.data.username}`);
    return history.push(historyState?.state?.from?.pathname || '/');
  };

  return (
    <>
      {loaded && (
        <BaseForm formType="register" handleFormSubmit={handleRegister} />
      )}
      {userFormSuccess && <span>{userFormSuccess}</span>}
      {userFormError && <span>{userFormError}</span>}
    </>
  );
}
