import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongoDB";
import { Content } from "@/models/Content";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import mongoose from "mongoose";
import ContentGrid from "../components/ContentGrid";
import "@/models/Logo";


type PageProps = {
  searchParams: {
    categoryId?: string;
  };
};

export default async function DashboardPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const { categoryId } = await searchParams;

  // console.log("categoryId from URL:", categoryId);

  await connectDB();

  const user = await User.findOne({ email: session.user.email });
  if (!user) redirect("/login");

  const filter: any = { userId: user._id };

  if (categoryId && mongoose.Types.ObjectId.isValid(categoryId)) {
    filter.categoryId = new mongoose.Types.ObjectId(categoryId);
  }

  const content = await Content.find(filter)
  .sort({ createdAt: -1 })
  .populate("categoryId", "name color")
  .populate("logoId")
  .lean();

  console.log("content", content);

const serializedContent = content.map((item) => ({
  _id: item._id.toString(),
  url: item.url,
  title: item.title,
  type: item.type,
  domain: item.domain,
  createdAt: item.createdAt?.toISOString(),

  categoryId: item.categoryId
    ? {
        name: item.categoryId.name,
        color: item.categoryId.color,
      }
    : null,

  logoId: item.logoId
    ? {
        _id: item.logoId._id.toString(),
        title: item.logoId.title,
        category: item.logoId.category,
        url: item.logoId.url,
       route: item.logoId.route
  ? {
      light: item.logoId.route.light ?? null,
      dark: item.logoId.route.dark ?? null,
    }
  : null,

      }
    : null,
}));


  return <ContentGrid content={serializedContent} />;

}
