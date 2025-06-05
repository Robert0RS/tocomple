import {Table,Column,Model,DataType,PrimaryKey,AutoIncrement,Default,AllowNull,} from "sequelize-typescript";
import bcrypt from 'bcrypt'
  
@Table({
    tableName: "dependencias",
    timestamps: true, // Habilita las marcas de tiempo automáticas
    freezeTableName: true,  // Evita pluralización automática
    hooks: {
        beforeCreate: async (dependencia: Dependencia) => {
            if (dependencia.contraseña) {
                const salt = await bcrypt.genSalt(10)
                dependencia.contraseña = await bcrypt.hash(dependencia.contraseña, salt)
            }
        },
        beforeUpdate: async (dependencia: Dependencia) => {
            if (dependencia.changed('contraseña')) {
                const salt = await bcrypt.genSalt(10)
                dependencia.contraseña = await bcrypt.hash(dependencia.contraseña, salt)
            }
        }
    }
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

@AllowNull(false)
@Column({
    type: DataType.STRING(100),
    unique: true,
    field: "correo_notificacion",
})
declare correoNotificacion: string;

@AllowNull(false)
@Column({
    type: DataType.STRING(255),
    field: "contraseña",
})
declare contraseña: string;

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

// Método para validar contraseñas
async validarContraseña(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.contraseña)
}
}

export default Dependencia;
