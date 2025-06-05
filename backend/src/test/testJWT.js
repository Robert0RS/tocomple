require('dotenv').config();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// Clave secreta para firmar el token
const secretKey = process.env.JWT_SECRET || 'defaultSecretKey';

// Función para generar un token
function generateToken(payload) {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

// Función para verificar y decodificar un token
function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return { valid: true, decoded };
    } catch (error) {
        return { valid: false, error: error.message };
    }
}

// Función para generar un reporte visual
function generateReport(result, token) {
    const reportPath = path.join(__dirname, 'JWT_Report.txt');
    const content = `
==========================
       JWT Test Report
==========================

🔑 Token generado:
${token}

🔍 Resultado de la verificación:
${result.valid ? '✅ Token válido' : '❌ Token inválido'}

${result.valid ? `📄 Datos decodificados: ${JSON.stringify(result.decoded, null, 2)}` : `⚠️ Error: ${result.error}`}

==========================
    `;

    fs.writeFileSync(reportPath, content, 'utf8');
    console.log(`📄 Reporte generado en: ${reportPath}`);
}

// Prueba del JWT
function testJWT() {
    console.log('🔑 Generando token...');
    const payload = { id: 1, rol: 'admin' };
    const token = generateToken(payload);
    console.log('✅ Token generado:', token);

    console.log('🔍 Verificando token...');
    const result = verifyToken(token);

    if (result.valid) {
        console.log('✅ Token válido. Datos decodificados:', result.decoded);
    } else {
        console.error('❌ Token inválido. Error:', result.error);
    }

    // Generar reporte
    generateReport(result, token);
}

// Ejecutar prueba
testJWT();
