import React, { useContext } from "react";
import { Redirect } from 'react-router-dom';
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";

import { AuthContext, signIn } from "./Auth";

const renderLoginMessage = () => (
  <>
    <p>Please log in to access your account.</p>
    <button onClick={signIn}>Sign in</button>
  </>
);

function LoginPage() {
  const currentUser = useContext(AuthContext);

  return (
    <>
      <h1>Login Page</h1>
      <div>
        {pipe(currentUser, O.fold(renderLoginMessage, () => <Redirect to="/home" />))}
      </div>
    </>
  );
}

export default LoginPage;
