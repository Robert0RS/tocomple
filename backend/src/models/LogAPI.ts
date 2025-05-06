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
    tableName: "logs_api",
    timestamps: false,
    freezeTableName: true,
  })
  class LogApi extends Model<LogApi> {
  
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.INTEGER,
    })
    declare id: number;
  
    @AllowNull(false)
    @Column({
      type: DataType.UUID,
      field: "request_id",
    })
    declare requestId: string;
  
    @ForeignKey(() => Usuario)
    @AllowNull(true)
    @Column({
      type: DataType.INTEGER,
      field: "user_id",
    })
    declare userId?: number;
  
    @BelongsTo(() => Usuario)
    declare usuario?: Usuario;
  
    @AllowNull(false)
    @Column({
      type: DataType.STRING(10),
    })
    declare method: string;
  
    @AllowNull(false)
    @Column({
      type: DataType.TEXT,
    })
    declare path: string;
  
    @AllowNull(false)
    @Column({
      type: DataType.INTEGER,
      field: "status_code",
    })
    declare statusCode: number;
  
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
  
    @AllowNull(true)
    @Column({
      type: DataType.INTEGER,
    })
    declare duration?: number;
  
    @Default(DataType.NOW)
    @AllowNull(false)
    @Column({
      type: DataType.DATE,
      field: "timestamp",
    })
    declare timestamp: Date;
  }
  
  export default LogApi;
  