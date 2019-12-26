import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Base } from "./Base";

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
}
