import React, { useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import Loading from "../components/shared/Loading";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    console.log("Signing up");
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    console.log("Logging in");
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const providerValue = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {loading ? <Loading label={"Setting user"}></Loading> : children}
    </AuthContext.Provider>
  );
}
