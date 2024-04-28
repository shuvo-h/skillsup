import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";



export const authOptions:NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [

        // provider 1: Github
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        
        // provider 2: Google
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),

        // ...add more providers here
    ],
    secret: process.env.NEXTAUTH_SECRET as string
  }
