import { model, models, Schema } from 'mongoose';
const crypto = require('crypto');

const CardSchema = new Schema({
    nombrePropietario: { type: String, required: true},
    numero: {type: String, required: true},
    fechaVencimiento: { type: String, required: true},
    cvv: {type: String, required: true},
    pais: { type: String, required: true},
}, {timestamps: true});

export const Card = models?.Card || model('Card', CardSchema);
