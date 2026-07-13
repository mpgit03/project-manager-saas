"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/authService";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await registerUser(formData);

      router.push("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ??
            "Registration failed"
        );
      } else {
        toast.error("Something went wrong");
      }
  }finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">

      <div className="absolute w-96 h-96 bg-purple-600/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-96 h-96 bg-blue-600/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-10 shadow-2xl"
      >
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-zinc-400 mt-3">
            Start organizing your projects smarter.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-zinc-400 text-sm mb-2 block">
              Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 focus:border-purple-500 transition-all text-white px-4 py-3 rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="text-zinc-400 text-sm mb-2 block">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 focus:border-purple-500 transition-all text-white px-4 py-3 rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="text-zinc-400 text-sm mb-2 block">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 focus:border-purple-500 transition-all text-white px-4 py-3 rounded-xl outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition-all text-white py-3 rounded-xl font-semibold mt-2"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-zinc-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-purple-400 hover:text-purple-300 font-medium transition-all"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}