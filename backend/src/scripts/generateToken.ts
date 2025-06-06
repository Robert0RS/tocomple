import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Datos de ejemplo para el token
const payload = {
    id: 1,
    correo: 'test@example.com'
};

// Generar el token usando la clave secreta del .env
const token = jwt.sign(
    payload,
    process.env.JWT_SECRET || 'tu_clave_secreta_muy_segura',
    { expiresIn: '24h' }
);

console.log('Token generado:');
console.log(token); 