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
  import Incidencia from "./Incidencia";
  
  @Table({
    tableName: "imagenes_incidencia",
    //timestamps: false,
    freezeTableName: true,
  })
  class ImagenIncidencia extends Model<ImagenIncidencia> {
  
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.INTEGER,
      field: "id_imagen",
    })
    declare idImagen: number;
  
    @ForeignKey(() => Incidencia)
    @AllowNull(false)
    @Column({
      type: DataType.INTEGER,
      field: "id_incidencia",
    })
    declare idIncidencia: number;
  
    @BelongsTo(() => Incidencia, { onDelete: 'CASCADE' })
    declare incidencia: Incidencia;
  
    @AllowNull(false)
    @Column({
      type: DataType.STRING(255),
      field: "url_imagen",
    })
    declare urlImagen: string;
  
    @AllowNull(true)
    @Column({
      type: DataType.TEXT,
    })
    declare descripcion?: string;
  
    @Default(DataType.NOW)
    @AllowNull(false)
    @Column({
      type: DataType.DATE,
      field: "fecha_creacion",
    })
    declare fechaCreacion: Date;
  }
  
  export default ImagenIncidencia;
  