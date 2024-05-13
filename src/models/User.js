import bcrypt from 'bcrypt'
import { model, models, Schema } from 'mongoose';

const UserSchema = new Schema({
    name: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String},
    image: {type:String},
    phone: {
        type: String,
        required: true,
        validate: pass => {
            if (!pass?.length || pass.length < 5) {
                new Error('password must be at least 5')
                return false;
            }
        }
    },
    streetAddress: {type: String},
    postalCode: {type: String},
    city: {type: String},
    country: {type: String},
}, {timestamps: true});

export const User = models?.User || model('User', UserSchema);