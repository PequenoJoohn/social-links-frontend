import NextAuth, { NextAuthConfig } from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { api } from "./app/api/api";
import { jwtDecode } from "jwt-decode";

interface SignInData {
  user: {
    id: number;
    email: string;
    password: string;
    username: string;
  };
  iat: number;
  exp: number;
}

export const config: NextAuthConfig = {
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  providers: [
    credentialsProvider({
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
        },
        password: { label: "Password", type: "password", minLength: 8 },
      },
      async authorize(credentials): Promise<any> {
        const { email, password } = credentials;

        try {
          const response = await api.post("/login", {
            email,
            password,
          });

          const token = response.data.token;

          const decodedToken = jwtDecode(token);

          if (!decodedToken || typeof decodedToken === "string") {
            throw new Error("Failed to decode token");
          }

          const { user } = decodedToken as SignInData;

          return {
            id: user.id,
            email: user.email,
            name: user.username,
          };
        } catch (error: any) {
          if (error.response && error.response.status === 401) {
            throw new Error("Invalid email or password");
          } else {
            throw new Error("Authentication failed");
          }
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  pages: {
    signIn: "/signin",
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config);
