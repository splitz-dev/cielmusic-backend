import axios from "axios";
import cheerio from "cheerio";
import { getCustomRepository } from "typeorm";
import { FileRepository } from "../repositories/FileRepository";
import { MusicRepository } from "../repositories/MusicRepository";
import { ArtistRepository } from "../repositories/ArtistRepository";
import { AlbumRepository } from "../repositories/AlbumRepository";
import { Artist } from "../models/Artist";
import { Album } from "../models/Album";
import { Music } from "../models/Music";
import { File } from "../models/File";
import { MusicType } from "../models/enum";

export class CrawlService {
  private musicRepository: MusicRepository;

  private artistRepository: ArtistRepository;

  private albumRepository: AlbumRepository;

  private fileRepository: FileRepository;

  constructor() {
    this.musicRepository = getCustomRepository(MusicRepository);
    this.artistRepository = getCustomRepository(ArtistRepository);
    this.albumRepository = getCustomRepository(AlbumRepository);
    this.fileRepository = getCustomRepository(FileRepository);
  }

  async getSongInBugs(name: string) {
    const response = await axios.get(`https://music.bugs.co.kr/search/track?q=${encodeURI(name)}`);
    let $ = cheerio.load(response.data);
    const songData = {
      name: $("#DEFAULT0 > table > tbody > tr:nth-child(1) > th > p > a").text(),
      order: 1,
      isTitle: false,
    };
    const artistData = {
      name: $("#DEFAULT0 > table > tbody > tr:nth-child(1) > td:nth-child(7) > p > a").text(),
      url:
        $("#DEFAULT0 > table > tbody > tr:nth-child(1) > td:nth-child(7) > p > a").attr("href") ||
        "",
      photo: "",
    };
    const albumData = {
      name: $("#DEFAULT0 > table > tbody > tr:nth-child(1) > td:nth-child(8) > a").text(),
      url:
        $("#DEFAULT0 > table > tbody > tr:nth-child(1) > td:nth-child(8) > a").attr("href") || "",
      photo: "",
    };
    const albumResponse = await axios.get(albumData.url);
    $ = cheerio.load(albumResponse.data);
    const albumSongs = $("table > tbody > tr > th > p > a");
    albumData.photo =
      $(
        "#container > section.sectionPadding.summaryInfo.summaryAlbum > div > div.basicInfo > div > ul > li > a > img",
      ).attr("src") || "";
    albumSongs.each((index, item) => {
      if ($(item).text() === songData.name) {
        songData.order = parseInt(
          $(`table > tbody > tr:nth-child(${index + 1}) > td:nth-child(4) > p > em`).text(),
          10,
        );
        const title = $(
          `table > tbody > tr:nth-child(${index + 1}) > td:nth-child(4) > p > span`,
        ).text();
        if (title) {
          songData.isTitle = true;
        }
      }
    });
    const artistResponse = await axios.get(artistData.url);
    $ = cheerio.load(artistResponse.data);
    artistData.photo =
      $(
        "#contentArea > section.sectionPadding.summaryInfo.summaryArtist > div > div.basicInfo > div > ul > li.big > a > img",
      ).attr("src") || "";

    const youtubeResponse = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "id",
        q: `${artistData.name} - ${songData.name} [${albumData.name}]`,
        key: process.env.YOUTUBE_KEY,
      },
    });
    const youtubeId = youtubeResponse.data.items[0].id.videoId;
    const artist = new Artist();
    artist.name = artistData.name;
    artist.photo = artistData.photo;
    let artistRow = await this.artistRepository.findOne(artist);
    if (!artistRow) artistRow = await this.artistRepository.save(artist);

    const album = new Album();
    album.photo = albumData.photo;
    album.name = albumData.name;
    album.artist = artistRow;
    let albumRow = await this.albumRepository.findOne(album);
    if (!albumRow) albumRow = await this.albumRepository.save(album);

    const file = new File();
    file.url = youtubeId;
    let fileRow = await this.fileRepository.findOne(file);
    if (!fileRow) fileRow = await this.fileRepository.save(file);

    const music = new Music();
    music.name = songData.name;
    music.order = songData.order;
    music.isTitle = songData.isTitle;
    music.type = MusicType.YOUTUBE;
    music.album = albumRow;
    music.file = fileRow;
    let musicRow = await this.musicRepository.findOne(music);
    if (!musicRow) musicRow = await this.musicRepository.save(music);

    return { result: !!(musicRow && albumRow && fileRow && artistRow), music: musicRow };
  }
}
