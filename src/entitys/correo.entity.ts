import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Correos {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100 })
  correo: string;

  @Column({ type: 'varchar', length: 250 })
  password: string;

  @Column({ type: 'int', default: 0, unsigned: true })
  contador: number;

  @Column({ type: 'tinyint', default: 0, unsigned: true })
  estado: number;

  @CreateDateColumn()
  createcAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
