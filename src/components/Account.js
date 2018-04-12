import React from 'react';
import AuthUserContext from 'components/auth/AuthUserContext';
import { PasswordForgetForm } from 'components/auth/PasswordForget';
import PasswordChangeForm from 'components/auth/PasswordChange';
import withAuthorization from 'components/auth/withAuthorization';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
