import { Column, Entity, PrimaryGeneratedColumn, Unique, OneToOne } from "typeorm";
import { Base } from "./Base";
import { Artist } from "./Artist";

@Entity({ orderBy: { createdAt: "DESC" } })
@Unique(["email"])
export class User extends Base {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  email!: string;

  @Column({ length: 10 })
  nickname!: string;

  @Column({ length: 64 })
  password!: string;

  @Column({ length: 200, nullable: true })
  photo!: string;

  @Column({ nullable: true })
  lastLogin!: Date;

  @Column({ nullable: true })
  verifiedAt!: Date;

  @OneToOne(
    (_) => Artist,
    (artist) => artist.id,
  )
  public artist?: Artist;
}
