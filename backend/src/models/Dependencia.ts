import {Table,Column,Model,DataType,PrimaryKey,AutoIncrement,Default,AllowNull,} from "sequelize-typescript";
  
@Table({
    tableName: "dependencias",
    //timestamps: false,      // Desactiva createdAt/updatedAt automáticos
    freezeTableName: true,  // Evita pluralización automática
})
class Dependencia extends Model<Dependencia> {

@PrimaryKey
@AutoIncrement
@Column({
    type: DataType.INTEGER,
    field: "id_dependencia",
})
declare idDependencia: number;

@AllowNull(false)
@Column({
    type: DataType.STRING(100),
})
declare nombre: string;

@AllowNull(true)
@Column({
    type: DataType.TEXT,
})
declare descripcion?: string;

@AllowNull(true)
@Column({
    type: DataType.STRING(100),
    field: "correo_notificacion",
})
declare correoNotificacion?: string;

@AllowNull(true)
@Column({
    type: DataType.STRING(20),
})
declare telefono?: string;

@AllowNull(true)
@Column({
    type: DataType.TEXT,
})
declare direccion?: string;

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

export default Dependencia;
