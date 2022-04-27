import * as React from "react";
import type { NextPage } from "next";
import { supabase } from "~/model";

const SignUpPage: NextPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await supabase.auth.signUp({ email, password });
    console.log("result", result);
  };
  return (
    <div className="h-screen flex items-center justify-center bg-green-50">
      <div className="p-10 rounded-lg shadow-2xl bg-white">
        <h1 className="text-2xl font-bold">Sign up</h1>
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
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
