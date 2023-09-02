import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect(); // never forget to use this connect function

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log("Reqeust body from Login api route:", reqBody);

    // checking if the user exists or not
    const user = await User.findOne({ email }); //getting user from data base

    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exist" },
        { status: 400 }
      );
    }

    // verifying the pasword:
    const validPassword = await bcryptjs.compare(password, user.password);
    // her we are comparing our password which is coming from reqBody and the password which is coming from database.

    // generating JWT
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    // _id is automatically created by mongodb on creating a new user
    // its your choice how much data you want to put in tokenData
    // creating  token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "login Successfully",
      success: true,
    });

    // storing token in httponly cookies
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    // since we have done all now we can return the response for this end point
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
