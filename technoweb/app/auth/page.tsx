"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, register } from "@/lib/auth";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  async function afterAuth() {
    router.push("/");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {isLogin ? "Connexion" : "Inscription"}
        </h1>

        {isLogin ? (
          <form action={login} onSubmit={afterAuth} className="space-y-4">
            <input
              name="login"
              required
              placeholder="Login"
              className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            />
            <input
              name="password"
              type="password"
              placeholder="password"
              required
              className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            />
            <button type="submit">log in</button>
          </form>
        ) : (
          <form action={register} onSubmit={afterAuth} className="space-y-4">
            <input
              name="login"
              required
              placeholder="Login"
              className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            />
            <input
              name="password"
              type="password"
              placeholder="password"
              className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
              required
            />
            <button type="submit">register</button>
          </form>
        )}

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-blue-600"
        >
          {isLogin ? "Create an account" : "Already have an account ?"}
        </button>
      </div>
    </div>
  );
}
