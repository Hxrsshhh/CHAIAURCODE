import CredentialsProvider from "next-auth/providers/credentials";
import { ConnectToDB } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "harsh@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.email || !credentials.password) {
            throw new Error("invalid credentials");
          }

          await ConnectToDB();

          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("User not found!");
          }

          const isValidate = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValidate) {
            throw new Error("validation failed !");
          }

          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (err) {
          throw err;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session
    },
  },
  pages:{
    signIn:'/login',
    error:'/login'
  },
  session: {
    strategy: "jwt",
    maxAge:30*24*60*60
  },
  secret:process.env.NEXTAUTH_SECRET
};
