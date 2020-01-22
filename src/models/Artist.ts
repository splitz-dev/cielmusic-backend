import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Base } from './Base';
import { Album } from './Album';
import { Music } from './Music';
import { User } from './User';

@Entity({ orderBy: { createdAt: 'DESC' } })
export class Artist extends Base {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ length: 100 })
  name!: string;
  @Column({ length: 200, nullable: true })
  photo!: string;
  @OneToMany(
    _ => Music,
    music => music.artist
  )
  public musics?: Music[];
  @OneToMany(
    _ => Album,
    album => album.id
  )
  public albums?: Album[];
  @OneToOne(
    _ => User,
    user => user.id
  )
  public user!: User;
}
