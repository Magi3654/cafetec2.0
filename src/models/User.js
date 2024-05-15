import bcrypt from 'bcrypt'
import { model, models, Schema } from 'mongoose';

const UserSchema = new Schema({
    name: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String},
    image: {type: String},
    country: {type: String},
    admin: {type:Boolean, default: false}, // Admin se define en mongoDB
}, {timestamps: true});

export const User = models?.User || model('User', UserSchema);