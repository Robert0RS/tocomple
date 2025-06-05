import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import Usuario from '../models/Usuario';
import Dependencia from '../models/Dependencia';

dotenv.config();

export const db = new Sequelize(process.env.DATABASE_URL, {
    models: [Usuario, Dependencia], // Registra los modelos aquí
    dialectOptions: {
        ssl: {
            require: false, // No usamos SSL
        },
    },
});