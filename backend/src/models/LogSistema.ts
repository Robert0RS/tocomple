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
    tableName: "logs_sistema",
    //timestamps: false,
    freezeTableName: true,
  })
  class LogSistema extends Model<LogSistema> {
  
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.INTEGER,
    })
    declare id: number;
  
    @AllowNull(false)
    @Column({
      type: DataType.STRING(50),
    })
    declare accion: string;
  
    @AllowNull(true)
    @Column({
      type: DataType.TEXT,
    })
    declare detalles?: string;
  
    @AllowNull(false)
    @Column({
      type: DataType.STRING(20),
    })
    declare resultado: string;
  
    @Default(DataType.NOW)
    @AllowNull(false)
    @Column({
      type: DataType.DATE,
      field: "fecha",
    })
    declare fecha: Date;
  }
  
  export default LogSistema;
  