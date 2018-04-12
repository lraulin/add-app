import React from 'react';

import { auth } from 'fb';

const SignOutPage = () => (
  <button type="button" onClick={auth.doSignOut}>
    Sign Out
  </button>
);

export default SignOutPage;
