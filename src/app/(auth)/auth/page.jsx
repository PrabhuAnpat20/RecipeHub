"use client";
import React, { useState } from "react";
import { auth, googleProvider } from "@/app/lib/firebase/clientApp";
import { toast } from "sonner";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile, // Import updateProfile
} from "firebase/auth";
import { useRouter } from "next/navigation";
import isAuth from "@/lib/hooks/isAuth";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      toast.success("Logged in with Google successfully!");
      router.push("/"); // Redirect after successful sign-in
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Logged in successfully!");
        router.push("/");
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        await updateProfile(user, { displayName: `${firstName} ${lastName}` });
        console.log("Profile updated successfully");

        // Wait a moment and fetch the user again
        const updatedUser = auth.currentUser;
        console.log("Updated user displayName:", updatedUser.displayName);
        toast.success("Signed up successfully!");

        // Optionally set user data in Firestore
        // await setDoc(doc(firestore, "users", user.uid), {
        //   firstName,
        //   lastName,
        //   email: user.email,
        // });

        router.push("/"); // Redirect after sign-up
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen">
      {/* Left Section */}
      <div className="flex items-center justify-center col-span-5 bg-[#F3893B]">
        <img src="chef.webp" alt="Chef" className="" />
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
          <button
            onClick={signInWithGoogle}
            className="w-full py-2 mt-4 bg-slate-50 hover:bg-slate-100 text-black font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-slate-100 focus:ring-opacity-75"
          >
            Sign in with Google
          </button>
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

export default isAuth(Auth);
