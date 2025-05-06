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
    tableName: "categorias",
    //timestamps: false,
    freezeTableName: true,
  })
  class Categoria extends Model<Categoria> {
  
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.INTEGER,
      field: "id_categoria",
    })
    declare idCategoria: number;
  
    @AllowNull(false)
    @Column({
      type: DataType.STRING(50),
    })
    declare nombre: string;
  
    @AllowNull(true)
    @Column({
      type: DataType.TEXT,
    })
    declare descripcion?: string;
  
    @AllowNull(true)
    @Column({
      type: DataType.STRING(50),
    })
    declare icono?: string;
  
    @AllowNull(true)
    @Column({
      type: DataType.STRING(20),
    })
    declare color?: string;
  
    @Default(true)
    @AllowNull(false)
    @Column({
      type: DataType.BOOLEAN,
    })
    declare activo: boolean;
  
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
  }
  
  export default Categoria;