import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';

connect()

export async function POST(request: NextRequest) { 
  try{

    const reqBody = await request.json()
    const [email, password] = reqBody;
    console.log(reqBody);


    //check if user exists
    const user = await User.findOne({email})
    if(!user) {
      return NextResponse.json({error: "User not found"}, {status: 404})
    }

    //check if password is correct
    const isPasswordCorrect = await bcryptjs.compare(password, user.password)
    if(!isPasswordCorrect) {
      return NextResponse.json({error: "Invalid credentials"}, {status: 401})
    }

    //create token data
    const tokenData = {
      _id: user._id,
      username: user.username,
      email: user.email
    }

    // create token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'})

    const response = NextResponse.json({
      message: "Login successful", 
      succes: true
    })
    
    response.cookies.set("token", token, {
      httpOnly: true})


  } catch(error: any) {

    return NextResponse.json({error: error.message}, {status: 500})

  }
}