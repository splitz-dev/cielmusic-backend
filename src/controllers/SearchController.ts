import { Get, Post, BodyParam, QueryParam, JsonController } from "routing-controllers";
import { SearchService } from "../services/SearchService";
import { CrawlService } from "../services/CrawlService";

@JsonController("/search")
export class SearchController {
  @Get("/music")
  async searchMusic(
    @QueryParam("query") query: string,
    @QueryParam("take") take: number,
    @QueryParam("skip") skip: number,
  ) {
    const music = await new SearchService().getSongByTitle(query, take, skip);
    return {
      result: music,
    };
  }

  @Get("/album")
  async searchAlbum(
    @QueryParam("query") query: string,
    @QueryParam("take") take: number,
    @QueryParam("skip") skip: number,
  ) {
    const album = await new SearchService().getAlbumByTitle(query, take, skip);
    return {
      result: album,
    };
  }

  @Get("/artist")
  async searchArtist(
    @QueryParam("query") query: string,
    @QueryParam("take") take: number,
    @QueryParam("skip") skip: number,
  ) {
    const artist = await new SearchService().getArtistByTitle(query, take, skip);
    return {
      result: artist,
    };
  }

  @Post("/fetch")
  async addData(@BodyParam("query") query: string) {
    const result = await new CrawlService().getSongInBugs(query);
    return {
      result,
    };
  }
}
