import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import prisma from "../../../lib/prisma";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    // Providers.GitHub({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),

    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      if (
        account.provider === "google" &&
        profile.verified_email === true &&
        profile.email.endsWith("@gmail.com")
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.SECRET,
};
