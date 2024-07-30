"use client";
import React, { useState } from "react";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login logic
      console.log("Login:", { email, password });
    } else {
      // Handle signup logic
      console.log("Signup:", { firstName, lastName, email, password });
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    // Reset form fields
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen">
      {/* Left Section */}
      <div className="flex items-center justify-center  col-span-5 bg-[#F3893B] ">
        <img src="chef.webp" alt="" className="" />
      </div>

      {/* Right Section */}
      <div className="relative flex items-center justify-center col-span-7 bg-slate-100 p-8">
        <div className="absolute top-4 left-4">
          <div className="flex font-semibold text-xl md:text-3xl ml-4">
            <p className="text-[#FD6A31]">Recipe</p>
            <span>Hub</span>
          </div>
        </div>
        <div className="w-full max-w-md p-8 bg-white text-black rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">
            {isLogin ? "Login to Recipe Hub" : "Sign Up for Recipe Hub"}
          </h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium mb-2"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-orange-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-orange-500"
                    required
                  />
                </div>
              </>
            )}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-orange-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          <p className="text-center mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={toggleForm}
              className="text-orange-500 hover:underline focus:outline-none"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
