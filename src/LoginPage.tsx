import React, { useContext } from "react";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";

import { AuthContext, signIn } from "./Auth";

function LoginPage() {
  const currentUser = useContext(AuthContext);

  return (
    <>
      <h1>Login Page</h1>
      <div>
        {pipe(
          currentUser,
          O.fold(
            () => (
              <>
                <p>Please log in to access your account.</p>
                <button onClick={signIn}>Sign in</button>
              </>
            ),
            user => (
              <>
                <p>You are already logged in!</p>
                <em>Currently logged in as {user.displayName}</em>
              </>
            )
          )
        )}
      </div>
    </>
  );
}

export default LoginPage;
