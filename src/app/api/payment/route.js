import { Card } from "@/models/Cards"
import mongoose from "mongoose";

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    const cardDoc = await Card.create(data);
    return Response.json(cardDoc);
}

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    const {_id, ...data} = await req.json();
    await Card.findByIdAndUpdate(_id, data);
    return Response.json(true);
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
    return Response.json(
        await Card.find()
    );
}

export async function DELETE(req) {
    mongoose.connect(process.env.MONGO_URL);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');

    await Card.deleteOne({_id});
    return Response .json(true)
}