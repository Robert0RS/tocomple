import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, AllowNull, 
  Default, ForeignKey, BelongsTo } from "sequelize-typescript";
import Dependencia from "./Dependencia";
import Categoria from "./Categoria";
  
@Table({
  tableName: "incidencias",
  //timestamps: false,
  freezeTableName: true,
  validate: {
    estadoValido() {
      const estados = ['Pendiente', 'En proceso', 'Resuelto', 'Cancelado'];
      if (!estados.includes(this.estado)) {
        throw new Error(`Estado inválido: ${this.estado}`);
      }
    },
    prioridadValida() {
      if (this.prioridad < 1 || this.prioridad > 5) {
        throw new Error('Prioridad debe estar entre 1 y 5');
      }
    }
  }
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
    type: DataType.STRING(100),
  })
  declare titulo: string;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
  })
  declare descripcion: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(255),
  })
  declare ubicacion: string;

  @AllowNull(true)
  @Column({
    type: DataType.DECIMAL(10, 8),
  })
  declare latitud?: number;

  @AllowNull(true)
  @Column({
    type: DataType.DECIMAL(11, 8),
  })
  declare longitud?: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
    field: "nombre_ciudadano",
  })
  declare nombreCiudadano: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(100),
    field: "correo_ciudadano",
  })
  declare correoCiudadano?: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(20),
    field: "telefono_ciudadano",
  })
  declare telefonoCiudadano?: string;

  @ForeignKey(() => Dependencia)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: "id_dependencia",
  })
  declare idDependencia: number;

  @BelongsTo(() => Dependencia)
  declare dependencia: Dependencia;

  @ForeignKey(() => Categoria)
  @AllowNull(true)
  @Column({
    type: DataType.INTEGER,
    field: "id_categoria",
  })
  declare idCategoria?: number;

  @BelongsTo(() => Categoria)
  declare categoria?: Categoria;

  @AllowNull(false)
  @Default('Pendiente')
  @Column({
    type: DataType.ENUM('Pendiente', 'En proceso', 'Resuelto', 'Cancelado'),
  })
  declare estado: 'Pendiente' | 'En proceso' | 'Resuelto' | 'Cancelado';

  @Default(3)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare prioridad: number;

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

  @AllowNull(true)
  @Column({
    type: DataType.DATE,
    field: "fecha_cierre",
  })
  declare fechaCierre?: Date;
}

export default Incidencia;
