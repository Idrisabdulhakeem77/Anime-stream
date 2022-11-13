import { FunctionComponent } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { ConfigType, ItemsPage } from "../../shared/types";
import FilmItem from "../Common/FilmItem";
import Skeleton from "../Common/Skeleton";
import { getExploreMovie, getExploreTV } from "../../services/explore";

interface ExploreMovieResultProps {
  pages?: ItemsPage[];
}

const ExploreMovieResult: FunctionComponent<ExploreMovieResultProps> = ({
  pages,
}) => {
  return (
    <ul className="grid grid-cols-sm lg:grid-cols-lg gap-x-8 gap-y-10 pt-2">
      {pages &&
        pages.map((page) =>
          page.results.map((item) => (
            <li key={item.id}>
              <FilmItem item={item} />
            </li>
          ))
        )}
      {!pages &&
        [...new Array(15)].map((_, index) => (
          <li key={index}>
            <Skeleton className="h-0 pb-[160%]" />
          </li>
        ))}
    </ul>
  );
};

interface ExploreTvResultProps {
  pages?: ItemsPage[];
}

const ExploreTvResult: FunctionComponent<ExploreTvResultProps> = ({
  pages,
}) => {
  return (
    <ul className="grid grid-cols-sm lg:grid-cols-lg gap-x-8 gap-y-10 pt-2">
      {pages &&
        pages.map((page) =>
          page.results.map((item) => (
            <li key={item.id}>
              <FilmItem item={item} />
            </li>
          ))
        )}
      {!pages &&
        [...new Array(15)].map((_, index) => (
          <li key={index}>
            <Skeleton className="h-0 pb-[160%]" />
          </li>
        ))}
    </ul>
  );
};

interface AnimeExploreResultProps {} 

const AnimeExplore : FunctionComponent<AnimeExploreResultProps> = () => {
    return (
      <ul className="grid grid-cols-sm lg:grid-cols-lg gap-x-8 gap-y-10 pt-2">
      {pages &&
        pages.map((page) =>
          page.results.map((item) => (
            <li key={item.id}>
              <FilmItem item={item} />
            </li>
          ))
        )}
      {!pages &&
        [...new Array(15)].map((_, index) => (
          <li key={index}>
            <Skeleton className="h-0 pb-[160%]" />
          </li>
        ))}
    </ul>
    )
}



interface ExploreResultProps {
  currentTab: string | null;
  config: ConfigType;
}

const ExploreResult: FunctionComponent<ExploreResultProps> = ({
  currentTab,
  config,
}) => {
  const {
    data: movies,
    error: errorMovies,
    fetchNextPage: fetchNextPageMovie,
    hasNextPage: hasNextPageMovie,
  } = useInfiniteQuery<ItemsPage, Error>(
    ["explore-result-movie", config],
    ({ pageParam = 1 }) => getExploreMovie(pageParam, config),
    {
      getNextPageParam: (lastPage) =>
        lastPage.page + 1 <= lastPage.total_pages
          ? lastPage.page + 1
          : undefined,
    }
  );

  const {
    data: tvs,
    error: errorTvs,
    fetchNextPage: fetchNextPageTv,
    hasNextPage: hasNextPageTv,
  } = useInfiniteQuery<ItemsPage, Error>(
    ["explore-result-tv", config],
    ({ pageParam = 1, queryKey }) =>
      getExploreTV(pageParam, queryKey[1] as { [key: string]: string }),
    {
      getNextPageParam: (lastPage) =>
        lastPage.page + 1 <= lastPage.total_pages
          ? lastPage.page + 1
          : undefined,
    }
  );


 

  if (errorMovies) return <div> Error : {errorMovies.message}</div>;
  if (errorTvs) return <div> Error : {errorTvs.message}</div>;

   

  return (
    <>
      {currentTab === "movie" && (
        <>
          {movies?.pages.reduce(
            (acc, current) => [...acc, current.results],
            [] as any
          ).length === 0 ? (
            <div className="flex flex-col items-center mb-12">
              <div>Error</div>
              <p className="text-3xl mt-5"> there is no such film</p>
            </div>
          ) : (
            <InfiniteScroll
              dataLength={movies?.pages.length || 0}
              next={() => fetchNextPageMovie()}
              hasMore={Boolean(hasNextPageMovie)}
              loader={<div>Loading more</div>}
              endMessage={<></>}
            >
              <ExploreMovieResult pages={movies?.pages} />
            </InfiniteScroll>
          )}
        </>
      )}

      {currentTab === "tv" && (
        <>
          {tvs?.pages.reduce(
            (acc, current) => [...acc, current.results],
            [] as any
          ).length === 0 ? (
            <div className="flex flex-col items-center mb-12">
              <div>Error</div>
              <p className="text-3xl mt-5"> there is no such film</p>
            </div>
          ) : (
            <InfiniteScroll
              dataLength={tvs?.pages.length || 0}
              next={() => fetchNextPageTv()}
              hasMore={Boolean(hasNextPageTv)}
              loader={<div>Loading more</div>}
              endMessage={<></>}
            >
              <ExploreTvResult pages={tvs?.pages} />
            </InfiniteScroll>
          )}
        </>
      )}


       { currentTab === "anime" && (
          <>
            <div>
               Anime explore
            </div>
           </>
       )}
    </>
  );
};

export default ExploreResult;
