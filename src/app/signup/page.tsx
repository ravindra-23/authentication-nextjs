"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputClass =
    "sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500";

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.password.length > 0 &&
      user.email.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Singup Successfully", response.data);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
      console.log("Signup Failed!!", error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="bg-gray-900 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
            {loading ? "Processing..." : "Create an Account"}
          </h1>

          <div className="space-y-4 md:space-y-6">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-white"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className={inputClass}
              placeholder="Ex. John Wick"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className={inputClass}
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className={inputClass}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 bg-gray-900 ${
              buttonDisabled ? "disabled: opacity-25" : "opacity-100"
            }`}
            onClick={onSubmit}
          >
            Signup
          </button>
          <p className="text-sm font-light text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium hover:underline text-primary-500"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
