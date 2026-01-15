import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoDB";
import { requireSession } from "@/lib/requireSession";
import { User } from "@/models/User";
import { Category } from "@/models/Category";
import { Content } from "@/models/Content";
import { resolveLogoFromSVGL } from "@/lib/resolveLogo";


function getContentType(url: string) {
  const lower = url.toLowerCase();

  if (/\.(png|jpg|jpeg|gif|webp)$/.test(lower)) return "image";
  if (lower.endsWith(".pdf")) return "pdf";
  if (/\.(mp4|webm|ogg)$/.test(lower) || getHostname(lower).includes('youtube')) return "video";

  // Cloudinary videos without extension
  if (url.includes("res.cloudinary.com") && url.includes("/video/")) {
    return "video";
  }

  return "link";
}

function getHostname(url: string){
  try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return url;
    }
}

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

    const { url, categoryId, title} = await req.json();

    if (!url || !categoryId) {
      return NextResponse.json(
        { message: "Missing fields" },
        { status: 400 }
      );
    }


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

    const type = getContentType(url);
    const domain = getHostname(url);

    // const appName = getAppNameFromDomain(domain);

let logo = null;
if (type === "link") {
  try {
    logo = await resolveLogoFromSVGL(domain);
    console.log("logo", logo);
  } catch (e) {
    console.error("SVGL failed", e);
  }
}
const content = await Content.create({
  userId: user._id,
  categoryId,
  url,
  title,
  type,
  domain,
  logoId: logo?._id,
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
      .populate("categoryId", "name color")
      .populate("logoId");

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
