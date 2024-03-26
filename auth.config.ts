import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { signinUser } from "./data";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await signinUser({ email, password });
          if (!user) return null;
          console.log(user.res);

          return user.res;
        }
        return null;
      },
    }),
  ],

  secret: process.env.NEXT_PUBLIC_SECRET as string,
} satisfies NextAuthConfig;
