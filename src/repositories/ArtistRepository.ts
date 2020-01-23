import { EntityRepository } from "typeorm";
import { Artist } from "../models/Artist";
import { BaseRepository } from "./base/BaseRepository";

@EntityRepository(Artist)
export class ArtistRepository extends BaseRepository<Artist> {}
