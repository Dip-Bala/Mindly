import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongoDB";
import { Category } from "@/models/Category";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  // console.log(session);
  if (!session) {
    return NextResponse.json(
      { message: "Use is not authenticated" },
      { status: 401 }
    );
  }
  // const user = session.user;
  try {
    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { message: "User not registered" },
        { status: 404 }
      );
    }
    console.log("user", user);

    const { name, color } = await req.json();

    const category = await Category.findOne({ userId: user._id, name });

    // console.log("category", category);
    if (category) {
      return NextResponse.json(
        { message: "Category already exists" },
        { status: 409 }
      );
    }
    await Category.create({
      name,
      color,
      userId: user._id,
    });

    return NextResponse.json(
      { message: "Category created successfully" },
      { status: 201 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  // console.log(session);
  if (!session) {
    return NextResponse.json(
      { message: "Use is not authenticated" },
      { status: 401 }
    );
  }
  try {
    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { message: "User not registered" },
        { status: 404 }
      );
    }
    const userId = user._id;
    let category = await Category.find({ userId });
    // console.log(category);
    if (category.length === 0) {
      const defaultCategyList = [
        { name: "Inbox", color: "neutral", userId },
        { name: "Learning", color: "yellow", userId },
        { name: "Work", color: "bluegray", userId },
        { name: "Ideas", color: "violet", userId },
        { name: "Archive", color: "gray", userId },
      ];
      category = await Category.insertMany(defaultCategyList);
    }
    return NextResponse.json({ category }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ status: 500 });
  }
}
