import { Category } from "@/models/Category";
import mongoose from "mongoose";

export async function POST(req) {
    const {name} = await req.json();
    const categoryDoc = await Category.create({name})
    return Response.json(categoryDoc);
}

export async function GET() {
    return Response.json(
        await Category.find()
    )
}