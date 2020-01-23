import { Get, Post, BodyParam, JsonController } from "routing-controllers";
import { SearchService } from "../services/SearchService";

@JsonController("/search")
export class SearchController {
  @Get("/music")
  async searchMusic(
    @BodyParam("query") query: string,
    @BodyParam("take") take: number,
    @BodyParam("skip") skip: number,
  ) {
    const music = await new SearchService().getSongByTitle(query, take, skip);
    return {
      result: music,
    };
  }

  @Get("/album")
  async searchAlbum(
    @BodyParam("query") query: string,
    @BodyParam("take") take: number,
    @BodyParam("skip") skip: number,
  ) {
    const album = await new SearchService().getAlbumByTitle(query, take, skip);
    return {
      result: album,
    };
  }

  @Get("/artist")
  async searchArtist(
    @BodyParam("query") query: string,
    @BodyParam("take") take: number,
    @BodyParam("skip") skip: number,
  ) {
    const artist = await new SearchService().getArtistByTitle(query, take, skip);
    return {
      result: artist,
    };
  }

  @Post("/fetch")
  async addData() {
    return {
      result: "user",
    };
  }
}
