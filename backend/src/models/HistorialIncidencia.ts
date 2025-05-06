import { Table, Column, Model, DataType, PrimaryKey, 
  AutoIncrement, AllowNull, Default, ForeignKey, BelongsTo 
} from "sequelize-typescript";
import Incidencia from "./Incidencia";
import Usuario from "./Usuario";

@Table({
  tableName: "historial_incidencias",
  //timestamps: false,
  freezeTableName: true,
})
class HistorialIncidencia extends Model<HistorialIncidencia> {

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    field: "id_historial",
  })
  declare idHistorial: number;

  @ForeignKey(() => Incidencia)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: "id_incidencia",
  })
  declare idIncidencia: number;

  @BelongsTo(() => Incidencia, { onDelete: 'CASCADE' })
  declare incidencia: Incidencia;

  @ForeignKey(() => Usuario)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: "id_usuario",
  })
  declare idUsuario: number;

  @BelongsTo(() => Usuario)
  declare usuario: Usuario;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(20),
  })
  declare estado: string;

  @AllowNull(true)
  @Column({
    type: DataType.TEXT,
  })
  declare comentario?: string;

  @Default(DataType.NOW)
  @AllowNull(false)
  @Column({
    type: DataType.DATE,
    field: "fecha",
  })
  declare fecha: Date;
}

export default HistorialIncidencia;
