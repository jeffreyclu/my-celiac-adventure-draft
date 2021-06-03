import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useGlobalState } from '../../state';
import { isAdminAuthorized } from '../auth/utils';

import BaseForm from './base-form';

export default function LoginForm({ adminRequired }) {
  const [loginFormData, setLoginFormData] = useGlobalState('loginFormData');
  const [loginFormError, setLoginFormError] = useGlobalState('loginFormError');
  const [loginFormSuccess, setLoginFormSuccess] =
    useGlobalState('loginFormSuccess');
  const [, setLoginFormDisabled] = useGlobalState('loginFormDisabled');
  const [, setLoggedIn] = useGlobalState('loggedIn');
  const [, setIsAdmin] = useGlobalState('isAdmin');
  const history = useHistory();
  const historyState = useLocation();
  const [loaded, setLoaded] = useState(false);

  const resetFormData = useCallback(() => {
    setLoginFormData({
      username: '',
      password: '',
    });
    setLoginFormDisabled(false);
  }, [setLoginFormData, setLoginFormDisabled]);

  useEffect(() => {
    if (loginFormSuccess) {
      setTimeout(() => setLoginFormSuccess(''), 3000);
    }
    if (loginFormError) {
      setTimeout(() => setLoginFormError(''), 5000);
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
    setLoginFormDisabled(true);
    const req = await fetch('/api/login', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginFormData),
    });

    if (req.status === 401) {
      resetFormData();
      return setLoginFormError('Username or password is invalid.');
    }

    if (!req.ok) {
      const { status, statusText } = req;
      resetFormData();
      return setLoginFormError(
        `${status} error: ${statusText}. Please try again later.`,
      );
    }

    const resp = await req.json();

    if (!resp.success) {
      resetFormData();
      return setLoginFormError(`Error: ${resp.error}. Please try again later.`);
    }

    if (adminRequired) {
      const adminAuthorized = await isAdminAuthorized();
      if (!adminAuthorized) {
        setIsAdmin(false);
        setLoggedIn(false);
        resetFormData();
        return setLoginFormError(`Error: you are not an administrator.`);
      }
      setIsAdmin(true);
    }

    setLoggedIn(true);
    resetFormData();
    setLoginFormSuccess(`Success: logged in.`);
    return history.push(historyState?.state?.from?.pathname || '/');
  };

  const handleLoginInputChange = (e) => {
    let value = e.target.value;
    // make sure we are using the right value type
    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    } else if (e.target.type === 'number') {
      value = parseInt(e.target.value);
    }
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: value,
    });
  };

  return (
    <>
      {loaded && (
        <BaseForm
          formType="login"
          handleFormSubmit={handleLogin}
          handleInputChange={handleLoginInputChange}
          formData={loginFormData}
        />
      )}
      {loginFormSuccess && <span>{loginFormSuccess}</span>}
      {loginFormError && <span>{loginFormError}</span>}
    </>
  );
}
