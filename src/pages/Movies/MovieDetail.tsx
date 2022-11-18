import { FC} from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import {getFullMovieDetails} from '../../services/movie'
import { FilmInfo} from "../../shared/types"
import FilmInfo from '../../components/Common/FilmDetail'


interface MovieDetailProps {}



const MovieDetail : FC<MovieDetailProps> = () => {
    const { id } = useParams()
    
    const {data , error , isError} = useQuery<FilmInfo | undefined>( ['movie-info'] ,  () => getFullMovieDetails(Number(id as string)))  

     console.log(data)
    if(isError) return <div> Error </div>
     

   return (
      <FilmInfo/>
   )
}


export default MovieDetail