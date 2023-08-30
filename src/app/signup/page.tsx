"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Axios } from "axios";
export default function SignupPage() {
  const [user, setUser] = useState({ email: "", password: "", usename: "" });

  const onSignup = async () => {};
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Signup</h1>
      <hr/>
      <label htmlFor="username">username</label>
    </div>
  );
}
