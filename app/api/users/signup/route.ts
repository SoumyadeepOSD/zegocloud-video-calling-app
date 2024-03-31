import bcryptjs from 'bcryptjs';
import { connectDB } from "@/dbConfig/dbConfig";
import {Users} from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";


connectDB();

export async function POST(request: NextRequest){
    try {
        const body = await request.json();
        const { fullName, email, password, mobileNumber } = body;
        const user = await Users.findOne({email});
        if(user){
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }else{
            const salt = await bcryptjs.genSalt(10);
            const hashedpassword = await bcryptjs.hash(password, salt);
            const createdUser = new Users({
                fullName: fullName,
                email: email,
                password: hashedpassword,
                mobileNumber: mobileNumber
            });
            const savedUser = await createdUser.save();
            return NextResponse.json({ 
                message: "User created successfully",
                success: true,
                savedUser
            });
        }
    } catch (error) {
        return NextResponse.json({ message: `Something went wrong ${error}` }, { status: 500 });
    }
}