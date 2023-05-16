import { auth } from "@/app/libs/firebase";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: 'Password' },
            },
            async authorize(credentials, req) {
                const res = await fetch("http:/localhost:3000/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    })
                })

                const user = await res.json()

                if (user) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV !== "production",
    callbacks: {
        async session({ session }) {
            session.user = auth as any
            return session
        }
    }
})

export { handler as GET, handler as POST }