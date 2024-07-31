// src/context/AuthContext.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/app/lib/firebase/clientApp";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

// AuthProvider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user); // Debug log
      if (user) {
        setUser({
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        });
      } else {
        setUser(null);
      }
    });
    console.log("context", user);
    return () => unsubscribe();
  }, [auth]);

  const value = {
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
