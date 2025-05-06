import {Table,Column,Model,DataType,PrimaryKey,AutoIncrement,Default,Unique,AllowNull,} from "sequelize-typescript";
  
@Table({
    tableName: "configuracion_sistema",
    //timestamps: false,           // Desactivamos createdAt/updatedAt automáticos
    freezeTableName: true,       // Para que no pluralice el nombre
})
class ConfiguracionSistema extends Model<ConfiguracionSistema> {

@PrimaryKey
@AutoIncrement
@Column({
    type: DataType.INTEGER,
})
declare id: number;

@Unique
@AllowNull(false)
@Column({
    type: DataType.STRING(50),
})
declare clave: string;

@AllowNull(false)
@Column({
    type: DataType.TEXT,
})
declare valor: string;

@AllowNull(true)
@Column({
    type: DataType.TEXT,
})
declare descripcion?: string;

@Default(DataType.NOW)
@AllowNull(false)
@Column({
    type: DataType.DATE,
    field: "fecha_actualizacion",
})
declare fechaActualizacion: Date;
}

export default ConfiguracionSistema;
  