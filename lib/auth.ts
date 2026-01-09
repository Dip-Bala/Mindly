import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "./mongoDB";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // await connectDB();

        // const user = await User.findOne({ email: credentials.email });

        const user = { id: "1", name: "Diya", email: "diya@gmail.com" }
        // if (!user || !user.password) {
        //   throw Error("Invalid email or password");
        // }

        // const isValid = await bcrypt.compare(
        //   credentials.password,
        //   user.password
        // );

        // if (!isValid) {
        //   return null;
        // }
        if(!user)return null;
        return {
          // id: user._id.toString(),
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
};
