import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAnimeFullDetails } from "../../services/anime";
import { useEffect } from "react";
import { ANIME_API_URL } from "../../shared/constants";
import axios from "axios";
import AnimeDetail from "../../components/Anime/AnimeDetail"
 
interface AnimeDetailsProps {}

const AnimeDetails = () => {
  const { id } = useParams();

  console.log(id);
  const { data, isError } = useQuery<any, Error>(["anime-details", id], () =>
    getAnimeFullDetails(Number(id as string))
  );

  // console.log(data);

  console.log(data)



  return (
    <>
        <AnimeDetail {...data } />
    </>
  );
};

export default AnimeDetails;
