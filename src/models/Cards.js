import { model, models, Schema } from 'mongoose';
const crypto = require('crypto');

const CardSchema = new Schema({
    nombrePropietario: {type: String},
    numero: {type: String},
    fechaVencimiento: {type: String},
    cvv: {type: String},
    pais: {type: String},
}, {timestamps: true});

// Middleware para cifrar el numero de tarjeta y el CVV antes de guardar
CardSchema.pre('save', function(next) {
    if (this.isModified('numero')) {
        this.numero = encrypt(this.numero);
    }

    if (this.isModified('cvv')) {
        this.cvv = encrypt(this.cvv);
    }

    next();
});

// Funcion para cifrar los datos
function encrypt(text) {
    const cipher = crypto.createCipher('aes-256-cbc', process.env.SECRET_KEY);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Funcion para descifrar los datos
CardSchema.methods.decryptNumber = function() {
    return decrypt(this.numero);
}

CardSchema.methods.decryptCVV = function() {
    return decrypt(this.cvv);
}

function decrypt(text) {
    const decipher = crypto.createDecipher('aes-256-cbc', process.env.SECRET_KEY);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

export const Card = models?.Card || model('Card', CardSchema);