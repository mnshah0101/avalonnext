"use client";
import { signIn } from "next-auth/react";
import { SetStateAction, useEffect, useState } from "react";
import CheckStatus from "@/components/login/CheckStatus";
import { SessionProvider } from "next-auth/react";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    setError("");
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result && result.status === 200) {
      window.location.href = "/dashboard";
      return;
    }

    setError("Invalid credentials");
  };

  const handleInputChange = (e: {
    target: { name: string; value: SetStateAction<string> };
  }) => {
    if (e.target.name === "email") {
      console.log(e.target.value);
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  return (
    <>
      {" "}
      <SessionProvider>
        <CheckStatus>
          <div className="flex flex-col h-full w-full">
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                  className="mx-auto"
                  src="/img/logos/black_only.png"
                  alt="Avalon Logo"
                  style={{ width: "6rem" }}
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Sign in to your account
                </h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={(e) => handleInputChange(e)}
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 px-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password
                      </label>
                      <div className="text-sm">
                        <a
                          href="#"
                          className="font-semibold text-black hover:text-indigo-500"
                        >
                          Forgot password?
                        </a>
                      </div>
                    </div>
                    <div className="mt-2">
                      <input
                        onChange={(e) => handleInputChange(e)}
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      Sign in
                    </button>

                    {error && (
                      <p className="mt-2 text-center text-sm text-red-500">
                        {error}
                      </p>
                    )}
                  </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                  Don't have an account?{" "}
                  <a
                    href="https://www.getavalon.io/request-demo"
                    className="font-semibold leading-6 text-black"
                    target="_blank"
                  >
                    Sign up here.
                  </a>
                </p>
              </div>
            </div>
          </div>
        </CheckStatus>
      </SessionProvider>
    </>
  );
}
