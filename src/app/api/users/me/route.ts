import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/helpers/getTokenData";
import User from "@/models/userModel";

export async function GET(request: NextRequest) {
  try {
    const userId = getTokenData(request);

    const user = await User.findById(userId).select("-password");

    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
