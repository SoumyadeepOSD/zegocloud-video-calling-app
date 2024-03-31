import { connectDB } from "@/dbConfig/dbConfig";
import { Users } from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';

connectDB();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { mobileNumber, password } = body;
        const salt = await bcryptjs.genSalt(10);
        const hashedpassword = await bcryptjs.hash(password, salt);
        const user = await Users.findOne({ mobileNumber });
        console.log(user);
        await Users.findOneAndUpdate({ mobileNumber: mobileNumber }, { password: hashedpassword }, {
            runValidators:false
        })
        return NextResponse.json({
            success: true,
            body: user
        },{status: 200});
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }   
}