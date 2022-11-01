import { useQuery } from '@tanstack/react-query'
import {FC} from 'react'
import { Link } from 'react-router-dom'
import {getRecommendedGenre} from '../../services/search'
import {  getRecommendedGenreType } from "../../shared/types"


const getRandomGenres = ( genres : { id : number , name : string}[] ) => {
   const  randomGenreIndex = [28 , 12 , 16 , 35 , 18 ,99 ,18]
   return randomGenreIndex.map((arrIndex) => genres[arrIndex])
}


interface RecommendedGenresProps {
     currentTab : string
}


const RecommendedGenres: FC<RecommendedGenresProps>  = ( { currentTab  }) => {
   

     const  { data , isError , isLoading , error }  = useQuery<getRecommendedGenreType ,  Error>(["genres"] , getRecommendedGenre) 

      if(isError) return <div> Error </div>    
      
        if(isLoading) return <div className="mt-36 mb-20 mx-auto h-10 w-10 rounded-full border-[5px] border-dark-lighten border-t-transparent animate-spin">  </div>

    if(isLoading) return <div>Loading</div>
       
    const randomGenres = getRandomGenres(
      currentTab === "movie" ? data.movieGenres : data.tvGenres
    );

   


      return (
         <ul className='mt-12 flex gap-3 flex-wrap'>
              { randomGenres.map( (genre , index) => (
                 <li key={index} className="mb-2">
                     <Link to="/">
                         { genre?.name}
                     </Link>
                 </li>
              ))}
         </ul>
      )
} 


export default  RecommendedGenres 