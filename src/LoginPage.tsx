import React, { useContext } from "react";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import { User } from "firebase";

import { AuthContext, signIn } from "./Auth";

const renderUserMessage = (user: User) =>
  pipe(
    O.fromNullable(user.displayName),
    O.fold(
      () => <p>You are already logged in!</p>,
      displayName => (
        <span>
          Currently logged in as <em>{displayName}</em>
        </span>
      )
    )
  );

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
        {pipe(currentUser, O.fold(renderLoginMessage, renderUserMessage))}
      </div>
    </>
  );
}

export default LoginPage;
