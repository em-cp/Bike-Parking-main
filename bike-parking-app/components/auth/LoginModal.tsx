"use client";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "../svgs"; // Ensure this path is correct for your Spinner component
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types"; // Update this path according to your project structure
import styles from './LoginModal.module.css'; // Ensure the path to your CSS module is correct
import { useUser } from "@/hooks/useUser";

const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

const LoginModal = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = async (
    values
  ) => {
    try {
      setLoading(true);

      // Check for the specific admin credentials
      if (
        values.email === "bikeparkingbikou@gmail.com" &&
        values.password === "P@ssw0rdP@ssw0rd"
      ) {
        router.push("/admin");
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword(values);
      if (error?.message) {
        console.log(error, error.message);
        alert(error.message);
        setLoading(false);
        return;
      } else {
        // Redirect on successful sign-in
        router.push("/map");
        router.refresh();
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`fixed inset-0 z-0 ${styles.backgroundImageFade}`}></div>
      <div className="fixed inset-x-0 top-0 z-10 flex justify-between items-center p-6 bg-transparent">
        <h2 className="text-xl font-bold text-white">BikOU</h2>
        <Link href="/login">
          <button className="py-2 px-4 rounded-md text-white bg-blue-500 hover:bg-blue-700 font-semibold">
            Login
          </button>
        </Link>
      </div>
      <div className="w-full max-w-sm z-20 mx-auto pt-20">
        <form
          className="bg-white shadow-md rounded px-8 py-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h1 className="text-center text-2xl pb-3 font-bold">Log In</h1>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-1">
              Email
            </label>
            <input
              {...form.register("email")}
              className={`shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline ${form.formState.errors.email ? "border-red-500" : ""}`}
              type="text"
              id="email"
              placeholder="Email"
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-xs italic">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-1">
              Password
            </label>
            <input
              {...form.register("password")}
              className={`shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline ${form.formState.errors.password ? "border-red-500" : ""}`}
              type="password"
              id="password"
              placeholder="Password"
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-xs italic">{form.formState.errors.password.message}</p>
            )}
            <Link href="#" className="font-bold text-sm text-blue-500 hover:text-blue-800">
              Forgot Password?
            </Link>
          </div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center">
                <Spinner className="animate-spin h-6" /> {/* Adjust if necessary */}
              </div>
            ) : (
              "Sign In"
            )}
          </button>
          <div className="flex justify-center my-4">
            <div className="w-full text-gray-400 flex items-center">
              <div className="border-t-2 w-full" />
            </div>
            <p className="text-gray-400 px-4">Or</p>
            <div className="w-full text-gray-400 flex items-center">
              <div className="border-t-2 w-full" />
            </div>
          </div>
          <button className="flex w-full border-2 py-2 mb-5 rounded-md justify-center items-center font-semibold hover:bg-gray-50">
            <FcGoogle className="h-6 w-6 mr-3" /> Continue with Google
          </button>
          <p className="text-center text-sm font-semibold text-gray-400 mb-3">
            {"Don't have an account?"}{' '}
            <Link href="/register" className="text-blue-500 hover:text-blue-800">
              Sign up
            </Link>
          </p>
          <Link href="/map" className="flex justify-center text-sm font-semibold text-gray-400 hover:text-gray-500">
            Continue as Guest
          </Link>
        </form>
      </div>
    </>
  );
};

export default LoginModal;