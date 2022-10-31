import axios from "../shared/axios";
import { ANIME_API_URL } from "../shared/constants";
import { Items } from "../shared/types";
import { HomeFilms } from "../shared/types";

export const getHomeMovies = async (): Promise<HomeFilms> => {
  const endpoints: { [key: string]: string } = {
    Trending: "/trending/movie/day",
    Popular: "/movie/popular",
    "Top Rated": "/movie/top_rated",
    Hot: "/trending/movie/day?page=2",
    Upcoming: "/movie/upcoming",
  };

  const responses = await Promise.all(
    Object.entries(endpoints).map((endpoint) => axios.get(endpoint[1]))
  );


  
  const data = responses.reduce((final, current, index) => {
     console.log(index)
    final[Object.entries(endpoints)[index][0]] = current.data.results.map(
      (item: Items) => ({
        ...item,
        media_type: "movie",
      })
    );

    return final;
  }, {} as HomeFilms);

  return data;
};

export const getMovieBannerInfo = async (movies: Items[]): Promise<any> => {
  const detailRes = await Promise.all(
    movies.map((movie) => axios.get(`/movie/${movie.id}`))
  );

  const translationRes = await Promise.all(
    movies.map((movie) => axios.get(`/movie/${movie.id}/translations`))
  );

  const translations = translationRes.map((item: any) =>
    item.data.translations
      .filter((translation: any) =>
        ["vi", "fr", "ja", "pt", "ru", "es"].includes(translation.iso_639_1)
      )
      .reduce((acc: any, element: any) => {
        if (element.iso_639_1 === "vi") {
          return [element, ...acc];
        }
        return [...acc, element];
      }, [] as any)
      .map((translation: any) => translation.data.title)
  );

  const genres = detailRes.map((item: any) =>
    item.data.genres.filter((_: any, index: number) => index < 3)
  );

  return genres.map((genre, index) => ({
    genre,
    translation: translations[index],
  }));
};


export const getHomeAnimes = async() => {
    const endpoint : { [ key : string] : string} = {
      
       
    }
}
