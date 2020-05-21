import React, { useEffect, useState } from "react";
import firebase, { User } from "firebase/app";
import "firebase/auth";
import * as O from "fp-ts/lib/Option";
import {
  RemoteData,
  initial,
  pending,
  failure,
  success
} from "@devexperts/remote-data-ts";

import firebaseApp from "./firebaseApp";

// --------- authentication actions ---------
export const signIn = () =>
  firebaseApp.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());

export const signOut = () => firebaseApp.auth().signOut();

// --------- React authentication functionality ---------
export type CurrentUser = RemoteData<Error, O.Option<User>>;

export const AuthContext = React.createContext<CurrentUser>(initial);

interface AuthProviderProps {
  children: React.ReactElement;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<CurrentUser>(pending);

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(
      user => {
        setUser(success(O.fromNullable(user)));
      },
      error => {
        setUser(failure(new Error(error.message)));
      }
    );
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
