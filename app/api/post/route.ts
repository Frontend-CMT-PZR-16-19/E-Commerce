import { getAllPosts } from "@/sanity/lib/postQueries";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await getAllPosts(); // return edilecek -> message, data

    if (response.data) {
      return NextResponse.json(response, { status: 200 });
    }

    return NextResponse.json(response, { status: 404 });
  } catch (error) {
    return NextResponse.json({
      data: null,
      message: "Beklenmedik bir hata oluştu",
    });
  }
}
