import { connectDB } from "@/dbConfig/dbConfig";
import { generateOTP } from "@/helpers/generateOtp";
import { sendsms } from "@/helpers/sendsms";
import { Users } from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";



connectDB();


export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { mobileNumber } = body;
        const user = await Users.findOne({ mobileNumber });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const otp = generateOTP();
        console.log("Generated OTP is: " + otp);
        await sendsms(mobileNumber, `Your otp is ${otp}`);
        return NextResponse.json({
            message: "User found",
            user: user,
            otp: otp
        }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}