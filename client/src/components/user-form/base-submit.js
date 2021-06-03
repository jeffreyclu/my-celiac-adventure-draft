import React from 'react';
import { useLocation } from 'react-router';

import { useGlobalState } from '../../state';

export default function BaseSubmit() {
  const { pathname } = useLocation();
  const [userFormDisabled] = useGlobalState('userFormDisabled');
  return (
    <input
      type="submit"
      value={/login/.test(pathname) ? 'Login' : 'Register'}
      disabled={userFormDisabled}
    />
  );
}
