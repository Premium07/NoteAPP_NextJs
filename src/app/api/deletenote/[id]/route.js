import { connectMongoDB } from "@/libs/ConnectMongo";
import Note from "@/libs/models/Note";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request, URLparams) {
  try {
    const id = URLparams.params.id;

    await connectMongoDB();
    await Note.findByIdAndDelete(id);

    return NextResponse.json({ msg: "Note Deleted Successfully" });
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
