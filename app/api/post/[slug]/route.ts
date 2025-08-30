import { getSinglePost } from "@/sanity/lib/postQueries";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    {params}: {params: Promise<{slug: string}>}
){
    const { slug } = await params;

    
    try {
        const response = await getSinglePost(slug);
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
    