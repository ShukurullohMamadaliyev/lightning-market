import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

// Used when the email doesn't exist, so authorize() always pays the same
// bcrypt cost — otherwise a missing user short-circuits fast and a real
// one doesn't, letting an attacker enumerate registered emails by timing.
const DUMMY_HASH = "$2b$10$kSZWVOoHnOY47Qb.EamgaemzFJAeGwxOabxyRaRBMlQYHwWaOy7LO";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, request) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        // Rate-limited here, not just in the login form's server action,
        // because this authorize() callback is also reachable directly at
        // /api/auth/callback/credentials, bypassing any UI-layer limiter.
        const ip = getClientIp(request.headers);
        if (!rateLimit(`authorize:${ip}`, 10, 15 * 60 * 1000)) {
          return null;
        }

        const user = await db.user.findUnique({ where: { email } });
        const isValid = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);
        if (!user || !isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user as { role: string }).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
