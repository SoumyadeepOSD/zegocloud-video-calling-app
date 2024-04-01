"use client";

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import Link from 'next/link';
import LoadingPage from '@/components/loading-page';

const Login = () => {
  const [userdata, setUserData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async() => {
    try {
      if(userdata.email === "" || userdata.password === ""){
        toast.error("Please fill all the fields");
        return;
      }
      setIsLoading(true);
      const response = await axios.post("/api/users/login", userdata);
      console.log(response.data);
      toast.success("User logged in successfully");
      router.push("/profile");
    } catch (error) {
      toast.error(`Something went wrong: ${error}`);
    }finally{
      
    }
  }

  if(isLoading){
    return <LoadingPage />
  }

 return (
    <div>
      <Toaster />
      <h1>Login</h1>
      <div className="flex flex-col items-center justify-center">
        <label>Email</label>
        <input
          type="email"
          value={userdata.email}
          className="border-2 border-black"
          onChange={(e) => {
            setUserData({ ...userdata, email: e.target.value });
          }}
        />

        <label>Password</label>
        <input
          type="password"
          value={userdata.password}
          className="border-2 border-black"
          onChange={(e) => {
            setUserData({ ...userdata, password: e.target.value });
          }}
        />
        <Link href={"/forgot-password"}>Forgot Password?</Link>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}

export default Login