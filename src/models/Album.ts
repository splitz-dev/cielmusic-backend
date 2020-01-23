import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { Base } from "./Base";
import { Music } from "./Music";
import { Artist } from "./Artist";

@Entity({ orderBy: { createdAt: "DESC" } })
export class Album extends Base {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 200, nullable: true })
  photo!: string;

  @OneToMany(
    (_) => Music,
    (music) => music.album,
  )
  public musics?: Music[];

  @ManyToOne(
    (_) => Artist,
    (artist) => artist.id,
  )
  public artist!: number;
}
