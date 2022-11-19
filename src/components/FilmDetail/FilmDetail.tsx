import { FC, useState } from "react";
import { DetailMovie, DetailTV, FilmInfo } from "../../shared/types";
import { useAppSelector } from "../../store/hooks";
import Title from "../Common/Title";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Sidebar from "../Common/Sidebar";
import Skeleton from "../Common/Skeleton";
import { resizeImage } from "../../shared/utils";

const FilmDetail: FC<FilmInfo> = ({
  similar,
  detail,
  credits,
  videos,
  reviews,
}) => {
     const currentUser = useAppSelector(state => state.user.user)
     const [isBookMarked , setIsBookMarked] = useState(false)
     const [isSidebarActive , setIsSidebarActive] = useState(false)
  return (
     <>
       { detail ? <Title value={`${( detail as DetailTV).name || (detail as DetailMovie).title} | Stream`}/> : null}

       <div className="flex justify-between items-center my-4 px-4 md:hidden">
        <Link to="/">
          <div className="uppercase font-medium text-lg tracking-widest">
            AnimeStream
          </div>
        </Link>
        <button onClick={() => setIsSidebarActive((prevState) => !prevState)}>
          <FaBars size={25} />
        </button>
      </div>

      <div className="flex items-start">
        <Sidebar
          isSidebarOpen={isSidebarActive}
          setIsSidebarOpen={setIsSidebarActive}
        />
         <div className="flex-grow ">
             {!detail ? <Skeleton className=""/> : null}
             {detail ? (
                <div style={{ backgroundImage : `url(${resizeImage(detail.backdrop_path )})`}}
                  className="bg-cover bg-no-repeat bg-center md:h-[400px] h-[300px] relative "
                 >
                   <div className="text-white" id="image-container">
                      <h1> { ( detail as DetailTV).name || (detail as DetailMovie).title } </h1>
                      <div className="flex justify-between">
                         <div>
                           { detail.genres.map(genre => (
                              <li key={genre.id} className="mb-2 list-none">
                                 { genre.name}
                              </li>
                           )) }
                         </div>
                         <div>
                             {`${( detail as DetailMovie).vote_average.toFixed(1)} / 10 `}
                          </div>   
                      </div>
                      <div>
                       <p>
                         {(detail as DetailMovie).overview}
                       </p>
                    </div>
                    </div>
                    
                </div>
             ) : null}
         </div>
        </div>
     </>
  );
};

export default FilmDetail;
