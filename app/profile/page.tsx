"use client";

import React from 'react'
import axios from 'axios'
import {toast, Toaster} from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const Profile = () => {
  const router = useRouter();
  const handleLogout = async() => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response.data);
      toast.success("User logged out successfully");
      router.replace("/login");
    } catch (error) {
      toast.error(`Something went wrong: ${error}`);
    }
  }
  return (
    <div>
      <Toaster/>
      Profile
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Profile