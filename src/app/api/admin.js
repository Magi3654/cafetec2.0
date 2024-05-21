import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]/route"
import { UserInfo } from "@/models/UserInfo";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userEmail = session.user.email;
  const userInfo = await UserInfo.findOne({ email: userEmail });

  if (!userInfo) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.status(200).json({ admin: userInfo.admin });
}