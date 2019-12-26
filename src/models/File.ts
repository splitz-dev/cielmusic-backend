import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Base } from "./Base";
import { Music } from "./Music";

@Entity({ orderBy: { createdAt: "DESC" } })
export class File extends Base {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ length: 200, nullable: true })
  url!: string;
  @Column({ default: 0 })
  read!: number;
  @OneToOne(
    _ => Music,
    music => music.id
  )
  public music!: number;
}
