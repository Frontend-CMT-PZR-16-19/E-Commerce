import { NextResponse } from "next/server";

export async function DELETE() {
  return NextResponse.json(
    { message: "DELETE isteği çağırıldı" },
    { status: 200 }
  );
}

export async function POST() {
  return NextResponse.json(
    { message: "POST isteği çağırıldı" },
    { status: 201 }
  );
}

export async function GET() {
  return NextResponse.json(
    { message: "GET isteği çağırıldı" },
    { status: 200 }
  );
}
