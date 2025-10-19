import { ConnectToDB } from "@/lib/db"; 
import { NextResponse } from "next/server"; 
import User from "@/models/User";


export async function POST(req:NextResponse){

  try{
    const {email,password,username} = await req.json();
  if(!email || !password || !username){
    return NextResponse.json(
      {error:"email,username & password is missing"},
      {status:400}
    )
  }
  await ConnectToDB()

  const existingUser = await User.findOne({email});
  if(existingUser){
    return NextResponse.json(
      {error:"User already exists"},
      {status:400}
    )
  }

  await User.create({email,username,password});

  return NextResponse.json(
    {message:"User created successfully"},
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