import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongoDB";
import { Content } from "@/models/Content";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import mongoose from "mongoose";
import ContentGrid from "../components/ContentGrid";

type PageProps = {
  searchParams: {
    categoryId?: string;
  };
};

export default async function DashboardPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const { categoryId } = await searchParams;

  console.log("categoryId from URL:", categoryId);

  await connectDB();

  const user = await User.findOne({ email: session.user.email });
  if (!user) redirect("/login");

  const filter: any = { userId: user._id };

  if (categoryId && mongoose.Types.ObjectId.isValid(categoryId)) {
    filter.categoryId = new mongoose.Types.ObjectId(categoryId);
  }

  const content = await Content.find(filter)
    .sort({ createdAt: -1 })
    .lean();

  return <ContentGrid content={content} />;
}
