import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import connectDB from "./mongoDB";
import { User } from "@/app/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
  pages: {
    signIn: "/login",
    signOut: "/logout"
  },
  providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
           email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials){
            if(!credentials?.email || !!credentials.password){
                throw Error("Missing Credentials");
            }

            await connectDB();
            
            const user = await User.findOne({email: credentials.email});

            if(!user || !user.password){
                throw Error("Invalid email or password");
            }

            const isValid = await bcrypt.compare(credentials.password, user.password);

            if(!isValid){
                return null
            }
            return{
                id: user._id.toString(),
                name: user.name,
                email: user.email,
            }
        }

    })
  ],
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

  }
}