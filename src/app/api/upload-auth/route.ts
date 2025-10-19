import { getUploadAuthParams } from "@imagekit/next/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (!process.env.IMAGEKIT_PRIVATE_KEY || !process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY) {
      throw new Error("Missing ImageKit keys in environment variables");
    }

    const { token, expire, signature } = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    });

    return NextResponse.json({
      token,
      expire,
      signature,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    });
  } catch (error) {
    console.error("ImageKit Auth Error:", error);
    return Response.json({ error: error }, { status: 500 });
  }
}
