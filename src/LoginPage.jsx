import React, { useContext } from "react";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";

import { AuthContext, signIn } from "./Auth";

function AuthenticatedMessage(user) {
  return (
    <React.Fragment>
      <p>You are already logged in!</p>
      <em>Currently logged in as {user.displayName}</em>
    </React.Fragment>
  );
}

function SignInMessage() {
  return (
    <>
      <p>Please log in to access your account.</p>
      <button onClick={signIn}>Sign in</button>
    </>
  );
}

function LoginPage() {
  const currentUser = useContext(AuthContext);

  return (
    <React.Fragment>
      <h1>Login Page</h1>
      <div>
        {pipe(currentUser, O.fold(SignInMessage, AuthenticatedMessage))}
      </div>
    </React.Fragment>
  );
}

export default LoginPage;
