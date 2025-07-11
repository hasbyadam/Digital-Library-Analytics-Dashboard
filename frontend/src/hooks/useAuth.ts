"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth({ redirectTo = "/login", protectedRoute = true } = {}) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (protectedRoute && !storedToken) {
      router.push(redirectTo);
    } else {
      setToken(storedToken);
    }

    setLoading(false);
  }, [router, redirectTo, protectedRoute]);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return {
    token,
    isAuthenticated: !!token,
    loading,
    logout,
  };
}
