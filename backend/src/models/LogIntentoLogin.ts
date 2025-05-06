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
    tableName: "log_intentos_login",
    //timestamps: false,
    freezeTableName: true,
  })
  class LogIntentoLogin extends Model<LogIntentoLogin> {
  
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.INTEGER,
    })
    declare id: number;
  
    @ForeignKey(() => Usuario)
    @AllowNull(true)
    @Column({
      type: DataType.INTEGER,
      field: "id_usuario",
    })
    declare idUsuario?: number;
  
    @BelongsTo(() => Usuario)
    declare usuario?: Usuario;
  
    @AllowNull(false)
    @Column({
      type: DataType.STRING(100),
    })
    declare correo: string;
  
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
      type: DataType.BOOLEAN,
    })
    declare exito: boolean;
  
    @AllowNull(true)
    @Column({
      type: DataType.STRING(255),
    })
    declare mensaje?: string;
  
    @Default(DataType.NOW)
    @AllowNull(false)
    @Column({
      type: DataType.DATE,
    })
    declare fecha: Date;
  }
  
  export default LogIntentoLogin;
  