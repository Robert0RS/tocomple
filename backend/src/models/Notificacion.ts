import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Default,
    ForeignKey,
    BelongsTo,
  } from "sequelize-typescript";
  import Usuario from "./Usuario";
  import Dependencia from "./Dependencia";
  
  @Table({
    tableName: "notificaciones",
    //timestamps: false,
    freezeTableName: true,
  })
  class Notificacion extends Model<Notificacion> {
  
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.INTEGER,
      field: "id_notificacion",
    })
    declare idNotificacion: number;
  
    @ForeignKey(() => Usuario)
    @AllowNull(true)
    @Column({
      type: DataType.INTEGER,
      field: "id_usuario",
    })
    declare idUsuario?: number;
  
    @BelongsTo(() => Usuario)
    declare usuario?: Usuario;
  
    @ForeignKey(() => Dependencia)
    @AllowNull(true)
    @Column({
      type: DataType.INTEGER,
      field: "id_dependencia",
    })
    declare idDependencia?: number;
  
    @BelongsTo(() => Dependencia)
    declare dependencia?: Dependencia;
  
    @AllowNull(false)
    @Column({
      type: DataType.STRING(100),
    })
    declare titulo: string;
  
    @AllowNull(false)
    @Column({
      type: DataType.TEXT,
    })
    declare mensaje: string;
  
    @AllowNull(false)
    @Column({
      type: DataType.STRING(20),
    })
    declare tipo: string;
  
    @Default(false)
    @AllowNull(false)
    @Column({
      type: DataType.BOOLEAN,
    })
    declare leida: boolean;
  
    @Default(DataType.NOW)
    @AllowNull(false)
    @Column({
      type: DataType.DATE,
      field: "fecha_creacion",
    })
    declare fechaCreacion: Date;
  }
  
  export default Notificacion;
  