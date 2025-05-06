import {Table,Column,Model,DataType,PrimaryKey,AutoIncrement,AllowNull,Unique,Default,ForeignKey,BelongsTo,} from "sequelize-typescript";
import Dependencia from "./Dependencia";

@Table({
    tableName: "usuarios",
    //timestamps: false,
    freezeTableName: true,
    validate: {
        checkDependenciaRol() {
        if (this.rol === 'dependencia' && this.idDependencia == null) {
            throw new Error('id_dependencia must be set when rol is dependencia');
        }
        }
    }
})
class Usuario extends Model<Usuario> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: "id_usuario",
    })
    declare idUsuario: number;

    @AllowNull(false)
    @Column({
        type: DataType.STRING(50),
    })
    declare nombre: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING(50),
    })
    declare apellido: string;

    @Unique
    @AllowNull(false)
    @Column({
        type: DataType.STRING(100),
    })
    declare correo: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING(255),
        field: "password_hash"
    })
    declare passwordHash: string;

    @AllowNull(false)
    @Column({
        type: DataType.ENUM('admin', 'dependencia'),
    })
    declare rol: 'admin' | 'dependencia';

    @ForeignKey(() => Dependencia)
    @AllowNull(true)
    @Column({
        type: DataType.INTEGER,
        field: "id_dependencia",
    })
    declare idDependencia?: number;

    @BelongsTo(() => Dependencia)
    declare dependencia?: Dependencia;

    @Default(true)
    @AllowNull(false)
    @Column({
        type: DataType.BOOLEAN,
    })
    declare activo: boolean;

    @AllowNull(true)
    @Column({
        type: DataType.TEXT,
        field: "refresh_token",
    })
    declare refreshToken?: string;

    @AllowNull(true)
    @Column({
        type: DataType.DATE,
        field: "ultima_sesion",
    })
    declare ultimaSesion?: Date;

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

export default Usuario;
