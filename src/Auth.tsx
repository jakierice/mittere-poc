import React, { useEffect, useState } from "react";
import firebase, { User } from "firebase/app";
import "firebase/auth";
import * as O from "fp-ts/lib/Option";

import firebaseApp from "./firebaseApp";

// --------- authentication actions ---------
export const signIn = () =>
  firebaseApp.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());

export const signOut = () => firebaseApp.auth().signOut();

// --------- React authentication functionality ---------
export type CurrentUser = O.Option<User>;

export const AuthContext = React.createContext<CurrentUser>(O.none);

interface AuthProviderProps {
  children: React.ReactElement;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<CurrentUser>(O.none);

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(user => {
      setUser(O.fromNullable(user));
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
