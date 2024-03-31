"use client";

import React, { useState } from 'react'
import {toast, Toaster} from 'react-hot-toast';
import axios from 'axios';
import { useGlobalContext } from '@/helpers/zustand/globalContext';
import { useRouter } from 'next/navigation';

const ResetPassword = () => {
    const [password, setPassword] = useState({
        initialPassword: "",
        confirmPassword: ""
    });
    const router = useRouter();
    const { mobileNumber } = useGlobalContext();
    const handleSubmit = async() => {
        try {
            if (mobileNumber === "") {
                toast.error("Please Verify your mobile Number First");
                return;
            }else if((password.initialPassword != "" || password.confirmPassword != "") && password.initialPassword === password.confirmPassword){
                const res = await axios.post("/api/users/verify-otp", 
                {
                    password: password.initialPassword,
                    mobileNumber: mobileNumber
                });
                if(res.status === 200){
                    toast.success("Password reset successfully");
                    router.replace("/login");
                }
            }
            else if(password.initialPassword != password.confirmPassword){
                toast.error("Passwords do not match");
            }

        } catch (error) {
            toast.error(`Something went wrong: ${error}`);
        }
        
    }

  return (
    <div className="flex flex-col items-center justify-center">
        <Toaster/>
        <label>Create New password</label>
            <input
                type="email"
                placeholder="Password"
                value={password.initialPassword}
                className="border-2 border-black"
                onChange={(e) => {
                    setPassword({ ...password, initialPassword: e.target.value });
                  }}
            />
            <label>Confirm your password</label>
            <input
                type="email"
                placeholder="Password"
                value={password.confirmPassword}
                className="border-2 border-black"
                onChange={(e) => {
                    setPassword({ ...password, confirmPassword: e.target.value });
                }}
            />
            <button onClick={handleSubmit}>Done</button>
    </div>
  )
}

export default ResetPassword