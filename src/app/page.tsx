"use client";

import {MouseEvent, useState} from "react";
import {useAuth} from "@/context/AuthContext";
import {Spin} from "antd";
import {LoadingOutlined} from '@ant-design/icons';

const Page = () => {
  const {login} = useAuth();
  const [loading, setLoading] = useState(false); // Loading state

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault(); // Prevent default form submission behavior

    setLoading(true); // Start loading

    try {

      if (!name || !email) {
        throw new Error("Name and email are required");
      }
      await login(name, email); // Perform login
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-5">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>

        {/* Spinner while loading */}
        {loading && (
          <div className="flex justify-center mb-4">
            <Spin indicator={<LoadingOutlined style={{fontSize: 48}} spin />} />

          </div>
        )}

        <div className="space-y-8" >
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              placeholder="Enter your name"
              className="mt-1 block w-full p-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              disabled={loading} // Disable input while loading
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="Enter your email"
              className="mt-1 block w-full p-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              disabled={loading} // Disable input while loading
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
