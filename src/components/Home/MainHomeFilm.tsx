import { FC } from "react";
import { HomeFilms } from "../../shared/types";
import BannerSlider from "../../components/Slider/BannerSlider";
import SectionSlider from "../Slider/SectionSlider";

interface MainHomeFilmProps {
  data: HomeFilms | undefined;
  isBannerLoading: boolean;
  isSectionLoading: boolean;
  dataDetails: any;
}

const MainHomeFilms: FC<MainHomeFilmProps> = ({
  isBannerLoading,
  data,
  dataDetails,
  isSectionLoading,
}) => {
  return (
    <>
      {/* <BannerSlider
        films={data?.Trending}
        isBannerLoading={isBannerLoading}
        dataDetails={dataDetails}
      /> */}
        
     {/* { isSectionLoading ? "loading" : (
         Object.entries(data as HomeFilms).filter(section => section[0] !== "Trending").map((section ,index) => {
            <li key={index}>
                <h2> {section[0]} </h2>
                <SectionSlider films={section[1]}/>
            </li>
         })
     )}           */}

         {/* <SectionSlider films={undefined}/> */}
              
              { isSectionLoading ? "Loading" : (
                  Object.entries(data as HomeFilms).filter((section) => section[0] !== "Trending").map((section , index) =>  (
                    <li key={index}> 
                       <h2> { section[0] }</h2>
                       <SectionSlider films={section[1]}/>
                     </li>
             ) )
              )}

           {  }


          { console.log(Object.entries(data as HomeFilms))}
   
    </>
  );
};

export default MainHomeFilms;
