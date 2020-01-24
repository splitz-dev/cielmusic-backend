import { EntityRepository } from "typeorm";
import { Album } from "../models/Album";
import { BaseRepository } from "./base/BaseRepository";

@EntityRepository(Album)
export class AlbumRepository extends BaseRepository<Album> {}
