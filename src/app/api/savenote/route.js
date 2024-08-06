import { connectMongoDB } from "@/libs/ConnectMongo";
import Note from "@/libs/models/Note";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, note } = body;
    await connectMongoDB();
    const data = await Note.create({ email, note });
    return NextResponse.json({ msg: "Note Saved Successfully", data });
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
