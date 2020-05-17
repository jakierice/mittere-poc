import React, { useEffect, useState } from "react";
import firebase, { User } from "firebase/app";
import "firebase/auth";
import { Option, fromNullable, none } from "fp-ts/lib/Option";

import firebaseApp from "./firebaseApp";
const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signIn = () => firebaseApp.auth().signInWithPopup(googleProvider);
export const signOut = () => firebaseApp.auth().signOut();

type CurrentUser = Option<User>;

export const AuthContext = React.createContext<CurrentUser>(none);

type AuthComponent = React.FC<{ children: React.ReactElement }>;
export const AuthProvider: AuthComponent = ({ children }) => {
  const [user, setUser] = useState<CurrentUser>(none);

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(user => {
      setUser(fromNullable(user));
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
