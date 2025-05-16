import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, AllowNull, Default, ForeignKey, BelongsTo } from "sequelize-typescript";
import Ciudadano from "./Ciudadano";

@Table({
  tableName: "reportes",
  //timestamps: false,
  freezeTableName: true,
})
class Reporte extends Model<Reporte> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    field: "id_reporte",
  })
  declare idReporte: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
  })
  declare tipo: string;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
  })
  declare descripcion: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(255),
  })
  declare ubicacion?: string;

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
  declare estado: 'pendiente' | 'en_proceso' | 'resuelto' | 'rechazado';

  @ForeignKey(() => Ciudadano)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: "id_ciudadano",
  })
  declare idCiudadano: number;

  @BelongsTo(() => Ciudadano)
  declare ciudadano: Ciudadano;

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

export default Reporte; 