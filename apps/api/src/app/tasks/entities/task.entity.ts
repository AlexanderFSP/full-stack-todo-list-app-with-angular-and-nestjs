import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ default: false })
  completed: boolean;
}
