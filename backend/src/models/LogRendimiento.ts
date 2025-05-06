import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Default,
  } from "sequelize-typescript";
  
  @Table({
    tableName: "logs_rendimiento",
    //timestamps: false,
    freezeTableName: true,
  })
  class LogRendimiento extends Model<LogRendimiento> {
  
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.INTEGER,
    })
    declare id: number;
  
    @AllowNull(false)
    @Column({
      type: DataType.TEXT,
    })
    declare ruta: string;
  
    @AllowNull(false)
    @Column({
      type: DataType.STRING(10),
    })
    declare metodo: string;
  
    @AllowNull(false)
    @Column({
      type: DataType.DECIMAL(10, 2),
      field: "tiempo_respuesta",
    })
    declare tiempoRespuesta: number;
  
    @AllowNull(true)
    @Column({
      type: DataType.STRING(45),
      field: "ip_address",
    })
    declare ipAddress?: string;
  
    @AllowNull(true)
    @Column({
      type: DataType.TEXT,
      field: "user_agent",
    })
    declare userAgent?: string;
  
    @Default(DataType.NOW)
    @AllowNull(false)
    @Column({
      type: DataType.DATE,
    })
    declare fecha: Date;
  }
  
  export default LogRendimiento;
  