import { getCustomRepository, Like } from "typeorm";
import { Music } from "../models/Music";
import { Artist } from "../models/Artist";
import { Album } from "../models/Album";
import { MusicRepository } from "../repositories/MusicRepository";
import { ArtistRepository } from "../repositories/ArtistRepository";
import { AlbumRepository } from "../repositories/AlbumRepository";

export class SearchService {
  private musicRepository: MusicRepository;

  private artistRepository: ArtistRepository;

  private albumRepository: AlbumRepository;

  constructor() {
    this.musicRepository = getCustomRepository(MusicRepository);
    this.artistRepository = getCustomRepository(ArtistRepository);
    this.albumRepository = getCustomRepository(AlbumRepository);
  }

  async getSongByTitle(query: string, take: number, skip: number): Promise<[Music[], number]> {
    const result = await this.musicRepository.findWithCount({
      take,
      skip,
      where: { name: Like(`%${query}%`) },
    });
    return result;
  }

  async getAlbumByTitle(query: string, take: number, skip: number): Promise<[Album[], number]> {
    const result = await this.albumRepository.findWithCount({
      take,
      skip,
      where: { name: Like(`%${query}%`) },
    });
    return result;
  }

  async getArtistByTitle(query: string, take: number, skip: number): Promise<[Artist[], number]> {
    const result = await this.artistRepository.findWithCount({
      take,
      skip,
      where: { name: Like(`%${query}%`) },
    });
    return result;
  }
}
