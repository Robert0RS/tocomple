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
  
  @Table({
    tableName: "log_sesiones",
    //timestamps: false,
    freezeTableName: true,
  })
  class LogSesion extends Model<LogSesion> {
  
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.INTEGER,
    })
    declare id: number;
  
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
      type: DataType.STRING(45),
      field: "ip_address",
    })
    declare ipAddress: string;
  
    @AllowNull(true)
    @Column({
      type: DataType.TEXT,
      field: "user_agent",
    })
    declare userAgent?: string;
  
    @AllowNull(false)
    @Column({
      type: DataType.STRING(50),
    })
    declare accion: string;
  
    @Default(DataType.NOW)
    @AllowNull(false)
    @Column({
      type: DataType.DATE,
    })
    declare fecha: Date;
  }
  
  export default LogSesion;
  