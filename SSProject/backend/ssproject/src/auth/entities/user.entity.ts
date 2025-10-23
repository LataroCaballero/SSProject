// src/auth/entities/user.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    Index,
    JoinColumn,
  } from 'typeorm';
  import { Role } from './role.entity';
  
  @Entity({ name: 'users' }) // Nombre de la tabla
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true, nullable: false })
    @Index() // Buena idea indexar el email para búsquedas rápidas
    email: string;
  
    @Column({ nullable: false })
    password?: string; // Hacemos la propiedad opcional (?) para poder excluirla al retornar datos
  
    @Column({ nullable: false })
    firstName: string;
  
    @Column({ nullable: false })
    lastName: string;
  
    @Column({ default: true })
    isActive: boolean;
  
    @CreateDateColumn({ type: 'timestamp with time zone' }) // O solo 'timestamp'
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp with time zone' }) // O solo 'timestamp'
    updatedAt: Date;
  
    // --- Relación con Role ---
    @ManyToOne(() => Role, (role) => role.users, {
      nullable: false, // Un usuario SIEMPRE debe tener un rol
      eager: true, // Carga automáticamente el rol al consultar un usuario (opcional pero útil)
    })
    @JoinColumn({ name: 'roleId' }) // Nombre de la columna de la clave foránea
    role: Role;
  
    @Column() // Necesario para que TypeORM cree la columna, pero usamos la relación 'role'
    roleId: number;
  }
  