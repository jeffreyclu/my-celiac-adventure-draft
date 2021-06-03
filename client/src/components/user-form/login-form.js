import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

import BaseForm from './base-form';
import { loginFormBaseData } from './constants';
import { useGlobalState } from '../../state';
import { isAdminAuthorized } from '../auth/utils';

export default function LoginForm({ adminRequired }) {
  const [userFormData, setUserFormData] = useGlobalState('userFormData');
  const [userFormError, setUserFormError] = useGlobalState('userFormError');
  const [userFormSuccess, setUserFormSuccess] =
    useGlobalState('userFormSuccess');
  const [, setUserFormDisabled] = useGlobalState('userFormDisabled');
  const [, setLoggedIn] = useGlobalState('loggedIn');
  const [, setCurrentUser] = useGlobalState('currentUser');
  const [, setIsAdmin] = useGlobalState('isAdmin');
  const history = useHistory();
  const historyState = useLocation();
  const [loaded, setLoaded] = useState(false);

  const resetFormData = useCallback(() => {
    setUserFormData(loginFormBaseData);
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setUserFormDisabled(true);
    const req = await fetch('/api/login', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userFormData),
    });

    if (req.status === 401) {
      resetFormData();
      return setUserFormError('Username or password is invalid.');
    }

    if (!req.ok) {
      const { status, statusText } = req;
      resetFormData();
      return setUserFormError(
        `${status} error: ${statusText}. Please try again later.`,
      );
    }

    const resp = await req.json();

    if (!resp.success) {
      resetFormData();
      return setUserFormError(`Error: ${resp.error}. Please try again later.`);
    }

    if (adminRequired) {
      const adminAuthorized = await isAdminAuthorized();
      if (!adminAuthorized) {
        setIsAdmin(false);
        setLoggedIn(false);
        resetFormData();
        return setUserFormError(`Error: you are not an administrator.`);
      }
      setIsAdmin(true);
    }

    setLoggedIn(true);
    setCurrentUser(resp.data);
    resetFormData();
    setUserFormSuccess(`Success: logged in.`);
    return history.push(historyState?.state?.from?.pathname || '/');
  };

  return (
    <>
      {loaded && <BaseForm formType="login" handleFormSubmit={handleLogin} />}
      {userFormSuccess && <span>{userFormSuccess}</span>}
      {userFormError && <span>{userFormError}</span>}
    </>
  );
}
