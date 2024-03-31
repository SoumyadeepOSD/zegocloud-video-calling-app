"use client";

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { toast, Toaster } from "react-hot-toast";
import axios from 'axios';
import { useGlobalContext } from '@/helpers/zustand/globalContext';
import { NextRequest } from 'next/server';
import Cookies from "js-cookie";


const ForgotPassword = () => {
    const router = useRouter();
    const { setMobileNumberMethod } = useGlobalContext();
    const [mobileNumber, setMobileNumber] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [OTP, setOtp] = useState("");
    const [generatedotp, setGeneratedOtp] = useState("");

    const onHandleSubmit = async () => {
        try {
            const res = await axios.post("/api/users/forgot_password", { mobileNumber: mobileNumber });
            if (res.status === 200) {
                toast.success("Recreate your password");
                setGeneratedOtp(res.data.otp);
                setIsAuthenticated(true);
                NextRequest.prototype.cookies.set("status", isAuthenticated.toString());
            }
        } catch (error) {
            toast.error(`Something went wrong: ${error}`);
        }

    }
 
    const handleSubmitOtp = () => {
        console.log({OTP, generatedotp});
        if (OTP.toString() === generatedotp) 
        {
            toast.success("OTP Verified ✅");
            setMobileNumberMethod(mobileNumber);
            router.replace("/reset-password");
        }
        else {
            toast.error("Invalid OTP ❌");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <Toaster />
            <label>Put your Mobile Number</label>
            <input
                type="email"
                placeholder="Mobile Number"
                value={mobileNumber}
                className="border-2 border-black"
                onChange={(e) => setMobileNumber(e.target.value)}
            />
            <button className="bg-blue-400" onClick={onHandleSubmit}>Send Verification code</button>
             
                <section>
                    <div>
                        <label>Put your OTP here</label>
                        <input
                            disabled={!isAuthenticated}
                            type="email"
                            placeholder="Enter OTP"
                            className="border-2 border-black"
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                    <button className="bg-blue-400" onClick={handleSubmitOtp}>Submit OTP</button>
                </section>
           
        </div>
    )
}

export default ForgotPassword