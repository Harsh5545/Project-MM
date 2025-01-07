import NextAuth from "next-auth";
import { prisma } from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials,'CREDENTAILS')
        if (!credentials) return null;

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            include: { role: true },
          });

          console.log("USER", user)

          if (!user) {
            throw new Error("This Email is Not register with us. Please register");
          }

          const isMatch = await bcrypt.compareSync(credentials.password, user.password);
          console.log(isMatch,"IS---MATCH");

          if (!isMatch) {
            throw new Error("Invalid password");
          }

          return {
            id: user.id,
            name: user.first_name,
            email: user.email,
            image: user.image,
            role: user.role.name,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error(error.message || "Authorization failed");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.image;
        session.user.role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
  },
  trustHost: true,
  // Optional: Explicitly add trusted hosts if you need to trust more than just the default
  trustedHosts: [
    'modernmannerism.com',
    // Add other trusted domains if needed
  ],
});
