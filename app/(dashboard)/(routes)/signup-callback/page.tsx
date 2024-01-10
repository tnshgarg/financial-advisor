"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function SignupCallback() {
  const router = useRouter();
  async function signupCallback() {
    const res = await axios.post("/api/signupCallback");
    if (res.status == 200) {
      router.push("/dashboard");
    }
    return res;
  }

  useEffect(() => {
    signupCallback();
  }, []);
  return <div>Please Wait...</div>;
}

export default SignupCallback;
