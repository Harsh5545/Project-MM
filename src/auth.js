// import NextAuth from "next-auth"
// import { prisma } from "./lib/prisma"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs"

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         email: {},
//         password: {},
//       },
//       async authorize(credentials) {
//         if (credentials === null) return null;

//         try {
//           const user = await prisma.user.findUnique({
//             where: {
//               email: credentials.email,
//             },
//             include: { role: true },
//           });
//           console.log("USER", user);
//           if (user) {
//             const isMatch = bcrypt.compare(
//               credentials.password,
//               user.password
//             );
//             if (isMatch) {
//               return user;
//             } else {
//               throw new Error("Email or Password is not correct");
//             }
//           } else {
//             throw new Error("User not found");
//           }
//         } catch (error) {
//           throw new Error(error);
//         }
//       },
//     })
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role.name
//         token.id = user.id
//         token.email = user.email
//         token.name = user.first_name
//         token.image = user.image
//       }
//       return token
//     },
//     async session({ session, token }) {
//       session.user.role = token.role
//       session.token.id = user.id
//       session.token.email = user.email
//       session.token.name = user.name
//       session.token.image = user.image
//       return session
//     }
//   },
//   pages: {
//     signIn: "/sign-in",
//     newUser: "/sign-up",
//   },
//   trueHost: true
// })


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
        if (!credentials) return null;

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            include: { role: true },
          });

          if (!user) {
            throw new Error("User not found");
          }

          const isMatch = bcrypt.compare(credentials.password, user.password);
          if (!isMatch) {
            throw new Error("Invalid email or password");
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
});
