"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { loginUser, registerUser } from "@/services/authService";

export default function AuthForm({ type }: { type: "login" | "register" }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      let response;

      if (type === "login") {
        response = await loginUser({
          email: formData.email,

          password: formData.password,
        });
      } else {
        response = await registerUser(formData);
      }

      localStorage.setItem("token", response.token);

      toast.success(`${type} successful`);

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white border rounded-3xl p-10 shadow-sm">
        <h1 className="text-4xl font-bold text-center">
          {type === "login" ? "Welcome Back" : "Create Account"}
        </h1>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          {type === "register" && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-2xl p-4"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-2xl p-4"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-2xl p-4"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-2xl p-4"
          >
            {loading
              ? "Please wait..."
              : type === "login"
                ? "Login"
                : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
