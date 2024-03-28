import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { signinUser } from "./data";
import { cookies } from "next/headers";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        let user = null;
        if (!validatedFields.success) {
          return {
            error: "Login Failed. Please check your email and password.",
          };
        }
        const { email, password } = validatedFields.data;
        const auhtuser = await signinUser({ email, password });

        if (!auhtuser) {
          return null;
        }
        user = auhtuser.res;
        if (user) {
          const cookie = cookies();
          // @ts-ignore
          cookie.set("access_token", user.token, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            httpOnly: true,
            path: "/",
            priority: "high",
          });
        }

        return {
          id: user.data.user_id,
          name: user.data.user.name,
          token: user.token,
          email: user.data.user.email,
          role: user.data.user.role,
          image:
            `https://ui-avatars.com/api/?name=${user.data.user
              .name!}&background=random` ?? "/facemoji.png",
        };
      },
    }),
  ],
  // callbacks: {
  //   // async jwt({ token, user }) {
  //   //   return { ...token, ...user };
  //   // },
  //   session: ({ session, token, user }) => {
  //     return {
  //       ...session,
  //       user: {
  //         ...session.user,
  //         access_token: token.access_token,
  //       },
  //     };
  //   },
  //   jwt: ({ token, user }) => {
  //     if (user) {
  //       const u = user as unknown as any;
  //       return {
  //         ...token,
  //         id: u.id,
  //         access_token: u.token,
  //       };
  //     }
  //     return token;
  //   },
  // },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
    authorized({ auth }) {
      const isAuthenticated = !!auth?.user;
      return isAuthenticated;
    },
  },
  secret: process.env.NEXT_PUBLIC_SECRET as string,
} satisfies NextAuthConfig;
