import bcrypt from 'bcrypt'
import { model, models, Schema } from 'mongoose';

const UserSchema = new Schema({
    name: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String},
    image: {type: String},
    phone: {type: String},
    country: {type: String},
    admin: {type:Boolean, default: false},
}, {timestamps: true});

UserSchema.post('validate', function (user) {
    const notHashedPassword = user.password;
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(notHashedPassword, salt);
})

export const User = models?.User || model('User', UserSchema);