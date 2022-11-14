import { FC, useState, useEffect } from "react";
import { useCurrentViewPort } from "../components/hooks/useCurrentViewPort";
import { ExploreMovieResult } from "../components/Explore/ExploreResult";
import { getExploreMovie } from "../services/explore";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ConfigType, ItemsPage } from "../shared/types";
import { useSearchParams, Link } from "react-router-dom";
import Sidebar from "../components/Common/Sidebar";
import MiniSidebar from "../components/Common/MiniSidebar";
import Title from "../components/Common/Title";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import InfiniteScroll from 'react-infinite-scroll-component'
import FilmItem from "../components/Common/FilmItem";

interface MoviesProps {}

const Movies: FC<MoviesProps> = () => {
  const [showScrollBtn, setShowStrollBtn] = useState(false);
  const { isMobile } = useCurrentViewPort();
  const [isSiderBarActive, setIsSidebarActive] = useState(false);
  const [config, setConfig] = useState({});
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const changeConfig = (key: string, value: string | number) => {
      setConfig((prevConfig) => ({
        ...prevConfig,
        [key]: value,
      }));
    };

    const sortType = searchParams.get("sort_by") || "popularity.desc";
    changeConfig("sort_by", sortType);

    const genreType = searchParams.getAll("genre") || [];
    changeConfig("with_genres", genreType.toString());

    const minRuntime = Number(searchParams.get("minRuntime")) || 0;
    const maxRuntime = Number(searchParams.get("maxRuntime")) || 200;
    changeConfig("with_runtime.gte", minRuntime);
    changeConfig("with_runtime.lte", maxRuntime);

    const releaseFrom = searchParams.get("from") || "2002-11-04";
    const releaseTo = searchParams.get("to") || "2022-07-28";
    changeConfig("primary_release_date.gte", releaseFrom);
    changeConfig("primary_release_date.lte", releaseTo);
    changeConfig("air_date.gte", releaseFrom);
    changeConfig("air_date.lte", releaseTo);

    // eslint-disable-next-line
  }, [location.search]);

  useEffect(() => {
    const checkIfScrollbuttonShowUp = () => {
      const scrollOffset = document.documentElement.scrollTop;

      if (scrollOffset > 1000) {
        setShowStrollBtn(true);
      } else {
        setShowStrollBtn(false);
      }
    };
    window.addEventListener("scroll", checkIfScrollbuttonShowUp);
    return () =>
      window.removeEventListener("scroll", checkIfScrollbuttonShowUp);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const {
    data: movies,
    error: errorMovies,
    fetchNextPage: fetchNextPageMovie,
    hasNextPage: hasNextPageMovie,
  } = useInfiniteQuery<ItemsPage, Error>(
    ["explore-result-movie"],
    ({ pageParam = 1 }) => getExploreMovie(pageParam),
    {
      getNextPageParam: (lastPage) =>
        lastPage.page + 1 <= lastPage.total_pages
          ? lastPage.page + 1
          : undefined,
    }
  );
  return (
    <>
      <Title value="Movie | Stream" />

      {showScrollBtn && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-[30px] right-[30px] z-10 transition duration-500 ${
            showScrollBtn ? "opacity-100" : "opacity-0"
          }`}
        >
          <BsFillArrowUpCircleFill
            size={35}
            className="hover:brightness-75 transition duration-300"
          />
        </button>
      )}

      <div className="flex justify-between items-center my-4 px-4 md:hidden">
        <Link to="/">
          <div className="uppercase font-medium text-lg tracking-widest">
            {" "}
            Stream{" "}
          </div>
        </Link>
        <button onClick={() => setIsSidebarActive((prevState) => !prevState)}>
          <FaBars size={25} />
        </button>
      </div>
      <div className=" flex flex-col-reverse md:flex-row ">
        {isMobile ? (
          <Sidebar
            setIsSidebarOpen={setIsSidebarActive}
            isSidebarOpen={isSiderBarActive}
          />
        ) : null}
        {!isMobile ? <MiniSidebar /> : null}

        <div className="flex-grow px-[2vw] pt-6">
          {movies?.pages.reduce(
            (acc, current) => [...acc, current.results],
            [] as any
          ).length === 0 ? (
            <div>no such anime</div>
          ) : (
            <InfiniteScroll
              dataLength={movies?.pages.length || 0}
              next={() => fetchNextPageMovie()}
              hasMore={Boolean(hasNextPageMovie)}
              loader={<div>Loading more</div>}
              endMessage={<></>}
            >
              <div className="">
                {movies?.pages.map((page) => {
                  const { results } = page;
                  return (
                    <ul className="grid grid-cols-sm lg:grid-cols-lg gap-x-8 gap-y-10 pt-2">
                      {results.map((item) => (
                        <li>
                          <FilmItem item={item} key={item.id} />
                        </li>
                      ))}
                    </ul>
                  );
                })}
              </div>
            </InfiniteScroll>
          )}
        </div>
      </div>
    </>
  );
};

export default Movies;