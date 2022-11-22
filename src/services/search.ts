import { getRecommendedGenreType, ItemsPage } from "../shared/types";
import axios from "../shared/axios";

export const getRecommendedGenre =
  async (): Promise<getRecommendedGenreType> => {
    const movieGenres = (await axios.get("/genre/movie/list")).data.genres;
    const tvGenres = (await axios.get("/genre/tv/list")).data.genres;

    return {
      movieGenres,
      tvGenres,
    };
  };

export const getSearchKeyWord = async (query: string): Promise<string[]> => {
  return (
    await axios.get("/search/keyword", {
      params: {
        query,
      },
    })
  ).data.results
    .map((item: any) => item.name)
    .filter((_: any, index: number) => index < 5);
};

export const getSearchResult: (
  page,
  search,
  query
) => Promise<ItemsPage> = async (page, search, query) => {
  const data = (
    await axios.get(`/search/${search}`, {
      params: {
        page,
        query,
      },
    })
  ).data;
};
