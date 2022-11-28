import { FunctionComponent, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useAppSelector } from "../../store/hooks";
import { HiOutlineUpload } from "react-icons/hi";

interface ProfileImageProps {}

const ProfileImage: FunctionComponent<ProfileImageProps> = () => {
  const [isUpdatingImage , setIsUpdatingImage] = useState(false)
  const currentUser = useAppSelector((state) => state.user.user);
  
  const updateProfileImage = () => {
      try {
         setIsUpdatingImage(true)

      } catch(err) {}
  }


  return (
    <div  className="bg-white rounded-md   md:h-[50vh] p-[40px]  w-[100%] md:w-[30vw] mt-10 ml-10 ">
      <h1 className="text-3xl font-semibold pb-6 text-center"> {currentUser?.displayName}</h1>
      <LazyLoadImage
        src="/Images/user.svg"
        alt="profile-image"
        className="h-[130px]  w-[130px] object-cover rounded-full mx-auto"
      />

      <label
        htmlFor="upload-image"
        className="flex items-center gap-2 px-4 py-3 mt-4 mb-4 place-items-center w-[70%] mx-auto transition duration-300  bg-green-400 rounded-full"
      >
        <HiOutlineUpload size={25} />
        <p> Upload a New Image </p>{" "}
      </label>

      <input
        type="file"
        accept="image/*"
        id="upload-image"
        className="hidden"
      />
    </div>
  );
};

export default ProfileImage;
