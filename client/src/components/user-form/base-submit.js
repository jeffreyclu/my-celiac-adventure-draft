import React from 'react';
import { useLocation } from 'react-router';

import { useGlobalState } from '../../state';

export default function BaseSubmit() {
  const { pathname } = useLocation();
  const [loginFormDisabled] = useGlobalState('loginFormDisabled');
  return (
    <input
      type="submit"
      value={/login/.test(pathname) ? 'Login' : 'Register'}
      disabled={loginFormDisabled}
    />
  );
}
