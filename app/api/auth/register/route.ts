import { User } from "@/models/User";
import connectDB from "@/lib/mongoDB";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest){
    try{
        const {name, email, password} = await req.json();
        if(!email || !password){
            return NextResponse.json(
                {message: "Missing fields"},
                {status: 400}
            )
        }

        await connectDB();
        const hashedPassword = await bcrypt.hash(password, 12);
        await User.create({
            name: name,
            email: email,
            password: hashedPassword
        });
        return NextResponse.json(
            {message: 'User Registered successfully'},
            {status: 201}
        )
    }
    catch(error:any){
        return NextResponse.json(
            {
                message: "somthing went wrong",
            },
            {status: 500}
        )
    }
}