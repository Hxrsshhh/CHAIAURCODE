import { ConnectToDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import {  NextResponse } from "next/server";

export async function POST(req:NextResponse){

  try{
    const {email,password} = await req.json();
    console.log(email,password);
    if(!email || !password){
      return NextResponse.json(
        {error:"email & password is missing"},
        {status:400}
      )
    }
    await ConnectToDB();

    const existingUser = await User.findOne({email});

    if(!existingUser){
      return NextResponse.json(
        {error:'User does not exits ! Please register first'},
        {status:404}
      )
    }

    const isValidate = await bcrypt.compare(password,existingUser.password);

    if(!isValidate){
      return NextResponse.json(
        {error:'Invalid Password'},
        {status:400}
      )
    }

    return NextResponse.json(
      {message:'User Logedin successfully'},
      {status:200}
    )
  }
  catch(err){
    return NextResponse.json(
      {error:err},
      {status:500}
    )
  }
}