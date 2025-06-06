import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, AllowNull, BeforeCreate, BeforeUpdate } from "sequelize-typescript";
import bcrypt from 'bcrypt';

@Table({
  tableName: "ciudadanos",
  freezeTableName: true,
})
class Ciudadano extends Model<Ciudadano> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    field: "id_ciudadano",
  })
  declare idCiudadano: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
    field: "primer_nombre",
  })
  declare primerNombre: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(50),
    field: "segundo_nombre",
  })
  declare segundoNombre?: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
    field: "primer_apellido",
  })
  declare primerApellido: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(50),
    field: "segundo_apellido",
  })
  declare segundoApellido?: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
    unique: true,
  })
  declare correo: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(20),
  })
  declare numero: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(255),
  })
  declare contraseña: string;

  @Column({
    type: DataType.DATE,
    field: "fecha_creacion",
    defaultValue: DataType.NOW,
  })
  declare fechaCreacion: Date;

  @Column({
    type: DataType.DATE,
    field: "fecha_actualizacion",
    defaultValue: DataType.NOW,
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

export default Ciudadano;
