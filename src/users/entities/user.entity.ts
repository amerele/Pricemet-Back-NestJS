import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  public username: string;

  @Column()
  public password: string;
}
