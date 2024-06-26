"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "@/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Login() {
  const [Err, setErr] = useState<boolean>(false);
  let { register, handleSubmit } = useForm();
  const Nevigate = useRouter();

  const formdata = async (data: any) => {
    try {
      signInWithEmailAndPassword(Auth, data.email, data.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          if (user) {
            Nevigate.push("/");
          }

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErr(true);
        });
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  };
  return (
    <div className="formcontainer">
      <div className="forwrapper">
        <span className="logo">Logo</span>
        <span className="tite">Sign In</span>
        <form action="" onSubmit={handleSubmit(formdata)}>
          <input
            {...register("email")}
            type="email"
            title="email"
            placeholder="email"
          />
          <input
            {...register("password")}
            type="password"
            title="password"
            placeholder="password"
          />
          <button>Sign in </button>
        </form>
        {Err && <span>Something went wrong</span>}
        <p>
          You Dont have an account?<Link href={"/register"}> Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
