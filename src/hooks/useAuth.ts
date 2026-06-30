import { useEffect, useState } from "react";
import {
  getAuthState,
  isAdminProfile,
  onAuthStateChange,
  signInWithEmail,
  signOut,
  type AuthState,
} from "../lib/auth";

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>({ session: null, profile: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getAuthState().then((state) => {
      if (active) {
        setAuth(state);
        setLoading(false);
      }
    });
    const unsubscribe = onAuthStateChange((state) => {
      if (active) setAuth(state);
    });
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  return {
    ...auth,
    loading,
    isAdmin: isAdminProfile(auth.profile),
    signInWithEmail,
    signOut,
  };
}
