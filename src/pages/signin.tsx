import * as React from "react";
import type { NextPage } from "next";
import { useEvent } from "effector-react/scope";
import { authModel } from "~/entities/auth";

const SignInPage: NextPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const signIn = useEvent(authModel.signIn);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signIn({ email, password });
  };
  return (
    <div className="h-full flex items-center justify-center bg-green-50">
      <div className="p-5 md:p-10 rounded-lg shadow-2xl bg-white w-[calc(100vw-2rem)] max-w-sm">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <div className="mt-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-xs uppercase text-gray-700 font-medium"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="border rounded p-2 mt-2"
              />
            </div>
            <div className="flex flex-col mt-5">
              <label
                htmlFor="password"
                className="text-xs uppercase text-gray-700 font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="border rounded p-2 mt-2"
              />
            </div>
            <button
              className="mt-5 px-6 py-2 bg-green-500 text-white uppercase text-sm font-bold rounded"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
