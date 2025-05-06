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
    tableName: "logs_errores",
    //timestamps: false,
    freezeTableName: true,
  })
  class LogError extends Model<LogError> {
  
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.INTEGER,
    })
    declare id: number;
  
    @AllowNull(true)
    @Column({
      type: DataType.UUID,
      field: "request_id",
    })
    declare requestId?: string;
  
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
      type: DataType.TEXT,
      field: "error_message",
    })
    declare errorMessage: string;
  
    @AllowNull(true)
    @Column({
      type: DataType.TEXT,
      field: "stack_trace",
    })
    declare stackTrace?: string;
  
    @AllowNull(true)
    @Column({
      type: DataType.TEXT,
    })
    declare path?: string;
  
    @AllowNull(true)
    @Column({
      type: DataType.STRING(10),
    })
    declare method?: string;
  
    @Default(DataType.NOW)
    @AllowNull(false)
    @Column({
      type: DataType.DATE,
      field: "timestamp",
    })
    declare timestamp: Date;
  }
  
  export default LogError;
  