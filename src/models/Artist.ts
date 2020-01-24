import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Base } from "./Base";
import { Album } from "./Album";

@Entity({ orderBy: { createdAt: "DESC" } })
export class Artist extends Base {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 200, nullable: true })
  photo!: string;

  @OneToMany(
    (_) => Album,
    (album) => album.id,
  )
  public albums?: Album[];

  @Column({ nullable: true })
  userId!: number;
}
