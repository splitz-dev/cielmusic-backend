import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne
} from "typeorm";
import { Base } from "./Base";
import { MusicType } from "./enum";
import { Album } from "./Album";
import { Artist } from "./Artist";
import { File } from "./File";

@Entity({ orderBy: { createdAt: "DESC" } })
export class Music extends Base {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ length: 50 })
  name!: string;
  @Column()
  order!: number;
  @Column({ type: "enum", enum: MusicType })
  type!: MusicType;
  @Column({ default: false })
  isTitle!: boolean;
  @ManyToOne(
    _ => Album,
    album => album.id
  )
  public album!: number;
  @ManyToOne(
    _ => Artist,
    artist => artist.id
  )
  public artist!: number;
  @OneToOne(
    _ => File,
    file => file.id
  )
  public file!: number;
}
