import bcryptjs from 'bcryptjs';
import { connectDB } from "@/dbConfig/dbConfig";
import {Users} from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

connectDB();

export async function POST(request: NextRequest){
    try {
        const body = await request.json();
        const { email, password } = body;
        const user = await Users.findOne({email});
        if(!user){
            return NextResponse.json({ message: "Create account first" }, { status: 400 });
        }else{
            const isPasswordCorrect = await bcryptjs.compare(password, user.password);
            if(!isPasswordCorrect){
                return NextResponse.json({ message: "Incorrect password" }, { status: 400 });
            }
            
            else{
                const payload = {
                    _id: user._id,
                    email: user.email,
                    fullName: user.fullName,
                    mobileNumber: user.mobileNumber
                }
               const generatedToken = await jwt.sign(payload, 
                process.env.NEXT_PUBLIC_JWT_SECRET!,
                {expiresIn: "1d"});

                const response = NextResponse.json({ message: "Login successful", success: true, user }, { status: 200 });

                response.cookies.set("token", generatedToken, {
                    httpOnly: true,
                });

                return response;
            }
        }
    } catch (error) {
        return NextResponse.json({ message: `Something went wrong ${error}` }, { status: 500 });
    }
}