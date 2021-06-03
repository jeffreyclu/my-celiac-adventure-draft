import React from 'react';
import LoginForm from '../../components/user-form/login-form';

export default function AdminLogin() {
  return (
    <>
      <h2>Admin Login</h2>
      <h3>You must be an administrator to view this page.</h3>
      <LoginForm adminRequired={true} />
    </>
  );
}
