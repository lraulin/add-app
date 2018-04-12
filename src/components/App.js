import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from 'components/Navigation';
import LandingPage from 'components/Landing';
import SignUpPage from 'components/auth/SignUp';
import SignInPage from 'components/auth/SignIn';
import PasswordForgetPage from 'components/auth/PasswordForget';
import HomePage from 'components/Home';
import AccountPage from 'components/Account';
import * as routes from 'constants/routes';
import withAuthentication from 'components/auth/withAuthentication';

const App = () => (
  <Router>
    <div>
      <Navigation />
      <hr />
      <Route exact={true} path={routes.LANDING} component={() => <LandingPage />} />
      <Route exact={true} path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route exact={true} path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route exact={true} path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
      <Route exact={true} path={routes.HOME} component={() => <HomePage />} />
      <Route exact={true} path={routes.ACCOUNT} component={() => <AccountPage />} />
    </div>
  </Router>
);

export default withAuthentication(App);
