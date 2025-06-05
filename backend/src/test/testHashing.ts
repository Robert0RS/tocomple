import { db } from '../config/db';
import Usuario from '../models/Usuario';
import Dependencia from '../models/Dependencia';

async function testHashing() {
    try {
        console.log('Iniciando pruebas de hashing de contraseñas...');

        // Sincronizar la base de datos
        await db.authenticate();
        console.log('✅ Conexión a la base de datos exitosa.');
        await db.sync();

        // Crear un usuario con un correo único y una contraseña en texto plano
        const plainPassword = 'miContraseñaSegura123';
        const uniqueEmail = `juan.perez+${Date.now()}@example.com`; // Generar un correo único
        const usuario = await Usuario.create({
            nombre: 'Juan',
            apellido: 'Pérez',
            correo: uniqueEmail,
            passwordHash: plainPassword,
            rol: 'admin',
        });

        console.log('Usuario creado:', usuario.toJSON());
        console.log('Contraseña almacenada (hash):', usuario.passwordHash);

        // Verificar que la contraseña almacenada no sea igual a la original
        if (usuario.passwordHash === plainPassword) {
            console.error('❌ Error: La contraseña no fue hasheada correctamente.');
        } else {
            console.log('✅ La contraseña fue hasheada correctamente.');
        }

        // Validar la contraseña
        const isValid = await usuario.validarPassword(plainPassword);
        console.log('¿La contraseña es válida?', isValid ? '✅ Sí' : '❌ No');

        // Crear una dependencia con un correo único y una contraseña en texto plano
        const dependenciaPassword = 'otraContraseñaSegura456';
        const uniqueDependenciaEmail = `dependencia+${Date.now()}@example.com`; // Generar un correo único
        const dependencia = await Dependencia.create({
            nombre: 'Dependencia de Prueba',
            correoNotificacion: uniqueDependenciaEmail,
            contraseña: dependenciaPassword,
        });

        console.log('Dependencia creada:', dependencia.toJSON());
        console.log('Contraseña almacenada (hash):', dependencia.contraseña);

        // Verificar que la contraseña almacenada no sea igual a la original
        if (dependencia.contraseña === dependenciaPassword) {
            console.error('❌ Error: La contraseña no fue hasheada correctamente.');
        } else {
            console.log('✅ La contraseña fue hasheada correctamente.');
        }

        // Validar la contraseña
        const isDependenciaValid = await dependencia.validarContraseña(dependenciaPassword);
        console.log('¿La contraseña de la dependencia es válida?', isDependenciaValid ? '✅ Sí' : '❌ No');
    } catch (error) {
        console.error('❗ Error durante las pruebas de hashing:', error);
    } finally {
        await db.close();
        console.log('🔒 Conexión a la base de datos cerrada.');
    }
}

// Ejecutar las pruebas
testHashing();
