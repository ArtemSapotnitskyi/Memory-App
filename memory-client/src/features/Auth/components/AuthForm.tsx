"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function AuthForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Login submitted:", { email, password });
    } else {
      console.log("Registration submitted:", { username, email, password });
    }

    router.push("/");
  };

  return (
    <div className="flex-1 flex flex-col h-full relative">
      <div className="flex-1 flex flex-col justify-center pb-20">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-full"
        >
          <div className="w-full max-w-75 flex flex-col gap-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-6 py-3.5 rounded-full bg-[#DEDEDE] dark:bg-[#1A1A1E] text-black dark:text-white border-[1.5px] border-black dark:border-[#2c2c2e] outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all font-medium placeholder:text-gray-500"
              />
            )}

            <input
              type="text"
              placeholder={isLogin ? "Email or Username" : "Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-3.5 rounded-full bg-[#DEDEDE] dark:bg-[#1A1A1E] text-black dark:text-white border-[1.5px] border-black dark:border-[#2c2c2e] outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all font-medium placeholder:text-gray-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-3.5 rounded-full bg-[#DEDEDE] dark:bg-[#1A1A1E] text-black dark:text-white border-[1.5px] border-black dark:border-[#2c2c2e] outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all font-medium placeholder:text-gray-500"
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
            className="mt-5 w-40 py-3.5 rounded-full bg-[#DEDEDE] dark:bg-[#E5E5E5] text-black font-extrabold border-[1.5px] border-black dark:border-transparent hover:bg-gray-300 dark:hover:bg-white transition-colors active:scale-95 text-lg"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>
      </div>

      <div className="pb-10 flex justify-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-gray-700 dark:text-gray-300 underline decoration-1 underline-offset-4 text-base hover:text-black dark:hover:text-white transition-colors"
        >
          {isLogin ? "Create Profile" : "Log in to profile"}
        </button>
      </div>
    </div>
  );
}
