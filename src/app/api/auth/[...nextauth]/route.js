import bcrypt from 'bcrypt'
import * as mongoose from "mongoose"
import clientPromise from "@/libs/mongoConnect";
import User from "@/models/User"
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from '@auth/mongodb-adapter';

const handler = NextAuth({
    secret: process.env.SECRET,
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",
            credentials: {
              username: { label: "Email", type: "email", placeholder: "test@example.com" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              const email = credentials?.email;
              const password = credentials?.password;
              
              mongoose.connect(process.env.MONGO_URL);
              const user = User.findOne({email});
              const passwordOk = user && bcrypt.compareSync(password, user.password) 

              console.log({password});

              if (passwordOk) {
                return user;
              }

              return null
            }
        })
    ],
})

export { handler as GET, handler as POST }