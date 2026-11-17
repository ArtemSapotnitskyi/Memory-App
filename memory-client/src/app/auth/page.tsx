"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useAuthStore } from "@/shared/store/auth.store";
import { authService } from "@/shared/api/services/authService";

const INPUT_STYLES =
  "w-full px-6 py-3.5 rounded-full bg-[#DEDEDE] dark:bg-[#1A1A1E] text-black dark:text-white border-[1.5px] border-black dark:border-[#2c2c2e] outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all font-medium placeholder:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed";

export default function AuthForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (error) setError(null);
  };

  const handleToggleMode = () => {
    setIsLogin((prev) => !prev);
    setError(null);
    setFormData({ username: "", email: "", password: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await authService.register(
          formData.username,
          formData.email,
          formData.password,
        );
        await login(formData.email, formData.password);
      }

      router.push("/");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(
          err.response?.data?.message ||
            "Something went wrong. Please check your information.",
        );
      } else {
        setError("Error connecting to the server");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full relative">
      <div className="flex-1 flex flex-col justify-center pb-20">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-full"
        >
          {error && (
            <div
              role="alert"
              className="mb-4 px-4 py-2 bg-red-100 text-red-600 rounded-lg font-medium text-sm text-center border border-red-200 w-full max-w-75 animate-in fade-in slide-in-from-top-2"
            >
              {error}
            </div>
          )}

          <div className="w-full max-w-75 flex flex-col gap-4">
            {!isLogin && (
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                disabled={isLoading}
                required={!isLogin}
                className={INPUT_STYLES}
              />
            )}

            <input
              type="text"
              name="email"
              placeholder={isLogin ? "Email or Username" : "Email"}
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              required
              className={INPUT_STYLES}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              required
              className={INPUT_STYLES}
            />
          </div>

          {isLogin && (
            <a
              href="#"
              className="mt-5 text-sm text-gray-700 dark:text-gray-400 underline decoration-1 underline-offset-4 hover:text-black dark:hover:text-white transition-colors"
            >
              Forgot a password
            </a>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-5 w-40 py-3.5 rounded-full bg-[#DEDEDE] dark:bg-[#E5E5E5] text-black font-extrabold border-[1.5px] border-black dark:border-transparent hover:bg-gray-300 dark:hover:bg-white transition-colors active:scale-95 text-lg disabled:opacity-50 disabled:cursor-wait"
          >
            {isLoading ? "Wait..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>
      </div>

      <div className="pb-10 flex justify-center">
        <button
          type="button"
          onClick={handleToggleMode}
          disabled={isLoading}
          className="text-gray-700 dark:text-gray-300 underline decoration-1 underline-offset-4 text-base hover:text-black dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLogin ? "Create Profile" : "Log in to profile"}
        </button>
      </div>
    </div>
  );
}
