const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Ciudadano = require('./Ciudadano');

const Reporte = sequelize.define('Reporte', {
  idReporte: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ubicacion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  latitud: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  longitud: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  imagenUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'en_proceso', 'resuelto'),
    defaultValue: 'pendiente'
  },
  idCiudadano: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Ciudadano,
      key: 'idCiudadano'
    }
  },
  fechaCreacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  fechaActualizacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'reportes',
  timestamps: false
});

// Relación con Ciudadano
Reporte.belongsTo(Ciudadano, { foreignKey: 'idCiudadano' });
Ciudadano.hasMany(Reporte, { foreignKey: 'idCiudadano' });

module.exports = Reporte;