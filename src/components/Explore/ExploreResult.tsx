import { FunctionComponent , useState } from "react";
import {useInfiniteQuery} from '@tanstack/react-query'
import  InfiniteScroll from 'react-infinite-scroll-component'
import   {LazyLoadImage} from 'react-lazy-load-image-component'
import {ConfigType , ItemsPage} from '../../shared/types'
import FilmItem from '../Common/FilmItem'
import Skeleton from '../Common/Skeleton'


interface ExploreResultProps {}


const ExploreResult : FunctionComponent<ExploreResultProps> = () => {
      return (
          <div>
             Explore Results
          </div>
      )
} 


export default ExploreResult