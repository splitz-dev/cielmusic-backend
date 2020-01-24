import { EntityRepository } from "typeorm";
import { File } from "../models/File";
import { BaseRepository } from "./base/BaseRepository";

@EntityRepository(File)
export class FileRepository extends BaseRepository<File> {}
