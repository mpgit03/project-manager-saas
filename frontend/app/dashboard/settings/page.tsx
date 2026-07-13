"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

type User = {
  name: string;
  email: string;
};

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
       const token = localStorage.getItem("token");

       const { data: user } = await axios.get<User>(
        `${process.env.NEXT_PUBLIC_API_URL}/users/getme`,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );

        setFormData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
        }));
        
    }catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            toast.error(
            error.response?.data?.message ??
                "Failed to load profile"
            );
        } else {
            toast.error("Something went wrong");
        }
    } finally {
      setLoading(false);
    }
  };

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

    if (
      formData.password &&
      formData.password !==
        formData.confirmPassword
    ) {
      toast.error(
        "Passwords do not match"
      );
      return;
    }

    try {
      setSaving(true);

      const token =
        localStorage.getItem("token");

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
        {
          name: formData.name,
          email: formData.email,
          ...(formData.password && {
            password: formData.password,
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Profile updated successfully"
      );

      setFormData((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            toast.error(
            error.response?.data?.message ??
                "Failed to update profile"
            );
        } else {
            toast.error("Something went wrong");
        }
}finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-zinc-400">
        Loading settings...
      </div>
    );
  }

  return (
    <div className="max-w-3xl">

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-2 text-zinc-400">
          Manage your account settings.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

          <h2 className="mb-6 text-2xl font-semibold text-white">
            Profile
          </h2>

          <div className="space-y-5">

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Name
              </label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Email
              </label>

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-purple-500"
              />
            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

          <h2 className="mb-6 text-2xl font-semibold text-white">
            Security
          </h2>

          <div className="space-y-5">

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                New Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={
                  formData.confirmPassword
                }
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-purple-500"
              />
            </div>

          </div>

        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 font-medium text-white transition hover:opacity-90"
        >
          {saving
            ? "Saving..."
            : "Save Changes"}
        </button>

      </form>

    </div>
  );
}