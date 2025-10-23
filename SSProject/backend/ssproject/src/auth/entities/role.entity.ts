import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm';
import { User } from './user.entity'; // Importaremos User después
import { RoleName } from '../enums/role-name.enum.ts';

@Entity({ name: 'roles' }) // Nombre de la tabla en la base de datos
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RoleName,
    unique: true, // Asegura que solo exista un rol con cada nombre
    nullable: false,
  })
  @Index() // Indexar esta columna puede ser útil
  name: RoleName;

  // Relación Inversa: Un rol puede tener muchos usuarios
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
