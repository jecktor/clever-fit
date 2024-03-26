import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { auth } from "@lib/firebase";

export function useFirebaseUser() {
  const [user, setUser] = useState(auth.currentUser);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) setLocation("/login");

      setUser(user);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user;
}
