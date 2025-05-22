import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, AllowNull, Default, ForeignKey, BelongsTo } from "sequelize-typescript";
import Ciudadano from "./Ciudadano";
import Dependencia from "./Dependencia";

@Table({
  tableName: "incidencias",
  //timestamps: false,
  freezeTableName: true,
})
class Incidencia extends Model<Incidencia> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    field: "id_incidencia",
  })
  declare idIncidencia: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
  })
  declare categoria: string;

  @AllowNull(true)
  @Column({
    type: DataType.TEXT,
    field: "descripcion_dependencia",
  })
  declare descripcionDependencia?: string;

  @AllowNull(true)
  @Column({
    type: DataType.TEXT,
    field: "descripcion_ciudadano",
  })
  declare descripcionCiudadano?: string;

  @AllowNull(true)
  @Column({
    type: DataType.TEXT,
    field: "descripcion_ayuntamiento",
  })
  declare descripcionAyuntamiento?: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(255),
  })
  declare ubicacion?: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(255),
  })
  declare calle?: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(255),
  })
  declare colonia?: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(5),
    field: "codigo_postal",
  })
  declare codigoPostal?: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(100),
  })
  declare ciudad?: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(100),
    field: "estado_ubicacion",
  })
  declare estadoUbicacion?: string;

  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
  })
  declare latitud: number;

  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
  })
  declare longitud: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(255),
    field: "imagen_url",
  })
  declare imagenUrl: string;

  @AllowNull(false)
  @Default('pendiente')
  @Column({
    type: DataType.ENUM('pendiente', 'en_proceso', 'resuelto', 'rechazado'),
  })
  declare estadoReporte: 'pendiente' | 'en_proceso' | 'resuelto' | 'rechazado';

  @AllowNull(false)
  @Default(1)
  @Column({
    type: DataType.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  })
  declare prioridad: number;

  @ForeignKey(() => Ciudadano)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: "id_ciudadano",
  })
  declare idCiudadano: number;

  @BelongsTo(() => Ciudadano)
  declare ciudadano: Ciudadano;

  @ForeignKey(() => Dependencia)
  @AllowNull(true)
  @Column({
    type: DataType.INTEGER,
    field: "id_dependencia",
  })
  declare idDependencia?: number;

  @BelongsTo(() => Dependencia)
  declare dependencia?: Dependencia;

  @Default(DataType.NOW)
  @AllowNull(false)
  @Column({
    type: DataType.DATE,
    field: "fecha_creacion",
  })
  declare fechaCreacion: Date;

  @Default(DataType.NOW)
  @AllowNull(false)
  @Column({
    type: DataType.DATE,
    field: "fecha_actualizacion",
  })
  declare fechaActualizacion: Date;
}

export default Incidencia; 