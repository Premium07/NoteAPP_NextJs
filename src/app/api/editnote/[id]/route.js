import { connectMongoDB } from "@/libs/ConnectMongo";
import Note from "@/libs/models/Note";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request, URLparams) {
  try {
    const body = await request.json();
    const { note } = body;

    const id = URLparams.params.id;

    await connectMongoDB();
    const data = await Note.findByIdAndUpdate(id, { note });

    return NextResponse.json({ msg: "Note Updated Successfully", data });
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
