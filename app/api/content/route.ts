import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoDB";
import { requireSession } from "@/lib/requireSession";
import { User } from "@/models/User";
import { Category } from "@/models/Category";
import { Content } from "@/models/Content";

export async function POST(req: NextRequest) {
  try {
    const session = await requireSession();
    await connectDB();

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const { url, categoryId } = await req.json();

    // console.log(url);
    // console.log(categoryId)

    if (!url || !categoryId) {
      return NextResponse.json(
        { message: "Missing fields" },
        { status: 400 }
      );
    }

    // Ensure category belongs to user
    const category = await Category.findOne({
      _id: categoryId,
      userId: user._id,
    });

    if (!category) {
      return NextResponse.json(
        { message: "Invalid category" },
        { status: 400 }
      );
    }

    const content = await Content.create({
      userId: user._id,
      categoryId,
      url,
      type: "link", // later auto-detect
    });

    return NextResponse.json({ content }, { status: 201 });
  } catch (err: any) {
    console.log(err)
    if (err.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function GET(req: NextRequest) {
  try {
    const session = await requireSession();
    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");

    const filter: any = { userId: user._id };

    if (categoryId) {
      filter.categoryId = categoryId;
    }

    const content = await Content.find(filter)
      .sort({ createdAt: -1 })
      .populate("categoryId", "name color");

    return NextResponse.json({ content }, { status: 200 });
  } catch (err: any) {
    if (err.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
