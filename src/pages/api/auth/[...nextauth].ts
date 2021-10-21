import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import prisma from "../../../lib/prisma";
import axios from "axios";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials property is used to generate a suitable form on the sign in page.
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Authentication Logic: local function, external API call, etc
        //const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        try {
          const user = await axios.post("/api/signin", {
            email: credentials.email,
            password: credentials.password,
          });

          if (user) {
            return user.data;
          } else {
            return null;
          }
        } catch (e) {
          throw new Error("There was an error on user authentication");
        }
      },
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      if (
        (account.provider === "google" &&
          profile.verified_email === true &&
          profile.email.endsWith("@gmail.com")) ||
        user
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  jwt: {
    // A secret to use for key generation - you should set this explicitly
    // Defaults to NextAuth.js secret if not explicitly specified.
    secret: "INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw",
  },
  // pages: {
  //   signIn: '/signin',
  //   newUser: '/signup'
  // }
};
