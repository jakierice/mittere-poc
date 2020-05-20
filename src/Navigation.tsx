import React, { useContext } from "react";
import { Link } from "react-router-dom";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";

import { AuthContext, signOut } from "./Auth";

function Navigation() {
  const currentUser = useContext(AuthContext);

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>

        {pipe(
          currentUser,
          O.fold(
            () => <Link to="/login">Login</Link>,
            () => <button onClick={signOut}>Logout</button>
          )
        )}
      </nav>
    </header>
  );
}

export default Navigation;
