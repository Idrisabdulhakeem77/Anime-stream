import { FunctionComponent } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import  {useAppSelector} from '../../store/hooks'
 
interface ProfileImageProps {}

const ProfileImage: FunctionComponent<ProfileImageProps> = () => {
    const currentUser = useAppSelector(state => state.user.user)
  return (
     <div className="shrink-0 md:max-w-[450px] w-full border-solid border-black">
         <h1> { currentUser?.displayName}</h1>
         <LazyLoadImage
           src="/Images/user.svg"
           alt="profile-image" 
           className="h-[200px]  w-[200px] object-cover rounded-full"
         />  
     </div>
  );
};

export default ProfileImage;
