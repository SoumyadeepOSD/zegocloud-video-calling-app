"use client";

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';

const Signup = () => {
  const [userdata, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    mobileNumber: ""
  });

  const router = useRouter();

  const handleSignup = async () => {
    try {
      if (userdata.fullName === "" || userdata.email === "" || userdata.password === "" || userdata.mobileNumber === "") {
        toast.error("Please fill all the fields");
        return;
      }
      const response = await axios.post("/api/users/signup", userdata);
      console.log(response.data);
      toast.success("User created successfully");
      router.push("/login");
    } catch (error) {
      toast.error(`Something went wrong: ${error}`);
    }
  }

  return (
    <div>
      <Toaster />
      <h1>Signup</h1>
      <div className="flex flex-col items-center justify-center">
        <label>Full Name</label>
        <input
          type="text"
          value={userdata.fullName}
          className="border-2 border-black"
          onChange={(e) => {
            setUserData({ ...userdata, fullName: e.target.value });
          }}
        />

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

        <label>Mobile Number</label>
        <input
          type="text"
          value={userdata.mobileNumber}
          className="border-2 border-black"
          onChange={(e) => {
            setUserData({ ...userdata, mobileNumber: e.target.value });
          }}
        />
        <button onClick={handleSignup}>Signup</button>
      </div>
    </div>
  )
}

export default Signup