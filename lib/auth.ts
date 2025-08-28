import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOPtions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                 email: { label: "Email", type: "text" },
                 password:{label: " password", type:"password"}
},
async authorize(credentials) {
    if(!credentials?.email || !credentials?.password){
        throw new Error("missing email or password ")
    }
    try {
        await connectToDatabase()
        const user= await User.findOne({email: credentials.email})
        if (!user){
          throw new Error ("no user found with this")
        }
        const isvalid =await bcrypt.compare (
            credentials.password,
            user.password
        )
        if (!isvalid)
            throw new Error("invalid password")
        return {
            id:user._id.toString(),
            email: user.email
        }
    } catch (error) {
        console.error("Auth error:",error)
        throw error
    }
},

   })

    // ...add more providers here
  ],
  callbacks : {
    async jwt({token ,user }){
        if(user){
            token.id= user.id
        }
        return token  
    },
    async session({session,token }){
        if(session.user){
            session.user.id = token.id as string
        }
        return session
    }
  },
  pages:{
    signIn:"/login",
    error: "/login"
  },
  session :{
    strategy : "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
}