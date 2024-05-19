import { model, models, Schema } from 'mongoose';
const crypto = require('crypto');

const IV_LENGTH = 16; // Para AES, este es siempre 16
const SECRET_KEY = process.env.SECRET_KEY;

const CardSchema = new Schema({
    nombrePropietario: { type: String },
    numero: {
        iv: { type: String },
        content: { type: String }
    },
    fechaVencimiento: { type: String },
    cvv: {
        iv: { type: String },
        content: { type: String }
    },
    pais: { type: String },
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
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(SECRET_KEY), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
        iv: iv.toString('hex'),
        content: encrypted
    };
}

function decrypt(encrypted) {
    const iv = Buffer.from(encrypted.iv, 'hex');
    const encryptedText = Buffer.from(encrypted.content, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(SECRET_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

// Funcion para descifrar los datos
CardSchema.methods.decryptNumber = function() {
    return decrypt(this.numero);
}

CardSchema.methods.decryptCVV = function() {
    return decrypt(this.cvv);
}

// Exporta la función decryptNumber
export function decryptNumber(text) {
    return decrypt(text);
}

export const Card = models?.Card || model('Card', CardSchema);
