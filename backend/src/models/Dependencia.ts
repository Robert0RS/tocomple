import {Table,Column,Model,DataType,PrimaryKey,AutoIncrement,Default,AllowNull,BeforeCreate,BeforeUpdate} from "sequelize-typescript";
import bcrypt from 'bcrypt'
  
@Table({
    tableName: "dependencias",
    timestamps: true, // Habilita las marcas de tiempo automáticas
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

// Método para hashear la contraseña
private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

// Hook para hashear la contraseña antes de crear
@BeforeCreate
async hashPasswordBeforeCreate() {
    if (this.contraseña) {
        this.contraseña = await this.hashPassword(this.contraseña);
    }
}

// Hook para hashear la contraseña antes de actualizar
@BeforeUpdate
async hashPasswordBeforeUpdate() {
    if (this.changed('contraseña')) {
        this.contraseña = await this.hashPassword(this.contraseña);
    }
}

// Método para verificar la contraseña
async verifyPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.contraseña);
}
}

export default Dependencia;
