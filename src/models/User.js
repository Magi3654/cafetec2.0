import bcrypt from 'bcrypt'
import { model, models, Schema } from 'mongoose';

const UserSchema = new Schema({
    //name: {type: String},
    email: {type: String, required: true, unique: true},
    /*password: {type: String},
    image: {type:String},
    */
    password: {
        type: String,
        
    },
    /*streetAddress: {type: String},
    postalCode: {type: String},
    city: {type: String},
    country: {type: String},*/
}, {timestamps: true});

UserSchema.pre('save', (next, ...rest) => {
    console.log(rest);
    next()
})
export const User = models?.User || model('User', UserSchema);