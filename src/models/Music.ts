import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Base } from "./Base";
import { MusicType } from "./Enum";
import { Album } from "./Album";
import { File } from "./File";
import { Artist } from "./Artist";

@Entity({ orderBy: { createdAt: "DESC" } })
export class Music extends Base {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 200 })
  name!: string;

  @Column()
  order!: number;

  @Column({ type: "enum", enum: MusicType })
  type!: MusicType;

  @Column({ default: false })
  isTitle!: boolean;

  @ManyToOne(
    (_) => Album,
    (album) => album,
  )
  public album!: Album;

  @ManyToOne(
    (_) => Album,
    (album) => album.artist,
  )
  public artist!: Artist;

  @OneToOne(
    (_) => File,
    (file) => file,
  )
  @JoinColumn({ name: "file_id" })
  public file!: File;
}
