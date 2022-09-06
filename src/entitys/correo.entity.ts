import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Correos {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  correo: string;

  @Column({ type: 'int', default: 0, unsigned: true })
  contador: number;

  @Column({ type: 'tinyint', default: 0, unsigned: true })
  estado: number;

  @CreateDateColumn()
  createcAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}