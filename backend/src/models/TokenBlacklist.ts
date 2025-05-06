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
    tableName: "token_blacklist",
    //timestamps: false,
    freezeTableName: true,
  })
  class TokenBlacklist extends Model<TokenBlacklist> {
  
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.INTEGER,
    })
    declare id: number;
  
    @AllowNull(false)
    @Column({
      type: DataType.UUID,
      field: "token_id",
    })
    declare tokenId: string;
  
    @ForeignKey(() => Usuario)
    @AllowNull(false)
    @Column({
      type: DataType.INTEGER,
      field: "user_id",
    })
    declare userId: number;
  
    @BelongsTo(() => Usuario)
    declare usuario: Usuario;
  
    @AllowNull(false)
    @Column({
      type: DataType.DATE,
      field: "expires_at",
    })
    declare expiresAt: Date;
  
    @Default(DataType.NOW)
    @AllowNull(false)
    @Column({
      type: DataType.DATE,
      field: "created_at",
    })
    declare createdAt: Date;
  }
  
  export default TokenBlacklist;
  