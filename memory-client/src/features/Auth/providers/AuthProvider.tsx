"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/shared/store/auth.store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!isInitialized) {
    return (
      <div className="flex-1 flex items-center justify-center h-full">
        <p className="text-gray-500 dark:text-gray-400 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
