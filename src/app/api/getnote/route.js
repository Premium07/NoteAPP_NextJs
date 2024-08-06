import { connectMongoDB } from "@/libs/ConnectMongo";
import Note from "@/libs/models/Note";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;
    await connectMongoDB();
    const data = await Note.find({ email });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error,
        msg: "Something Went Wrong!",
      },
      { status: 400 }
    );
  }
}
