"use client";
import { Auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthContextProvider = ({ children }: any) => {
  const [currentUser, setcurrentUser] = useState({});
  useEffect(() => {
    const unsub = onAuthStateChanged(Auth, (user: any) => {
      setcurrentUser(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
