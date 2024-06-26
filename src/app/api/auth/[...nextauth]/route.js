import NextAuth, {getServerSession} from "next-auth/next";
import { authOptions } from "@/libs/authOption";

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }