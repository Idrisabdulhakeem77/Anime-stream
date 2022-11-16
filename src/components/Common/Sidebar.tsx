import { FC, useState } from "react";
import { AiOutlineHome, AiOutlineHistory, AiOutlineStar } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineExplore } from "react-icons/md";
import { BiSearch, BiUserCircle } from "react-icons/bi";
import { BsBookmarkHeart, BsCameraVideo } from "react-icons/bs";
import { HiOutlineLogin } from "react-icons/hi";
import { useCurrentViewPort } from "../hooks/useCurrentViewPort";
import { BsFillEyeFill } from "react-icons/bs";
import { RiSlideshow4Line } from "react-icons/ri";
import { FiAnchor } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import { useAppSelector } from "../../store/hooks";
import { signOut } from "firebase/auth";
import { auth } from "../../shared/firebase";
import { toast, ToastContainer } from "react-toastify";
import { setCurrentUser } from "../../store/slice/userSlice";
import { useAppDispatch } from "../../store/hooks";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: any;
}

const Sidebar: FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { isMobile } = useCurrentViewPort();
  const currentUser = useAppSelector((state) => state.user.user);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const closeSideBar = () => {
    setIsSidebarOpen(false);
  };

  const dispatch = useAppDispatch();

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        toast.success(" Successfully Signed out", {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          draggable: true,
          pauseOnHover: true,
          hideProgressBar: false,
        });

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
  };

  const privateUrlhandler = (destinationurl: string) => {
    if (!currentUser) {
      toast.info(" You need to sign in to access this route", {
        autoClose: 3000,
        draggable: true,
        pauseOnHover: true,
        closeOnClick: true,
        hideProgressBar: false,
        position: "top-right",
      });
      return;
    }
    navigate(destinationurl);
  };
  return (
    <>
      <ToastContainer />

      <div
        className={`shrink-0 h-full md:max-w-[260px] w-[70vw] bg-slate-300  fixed  -translate-x-full transition duration-300 ${
          isSidebarOpen && "translate-x-0"
        } top-0 shadow-md md:sticky md:translate-x-0 md:bg-transparent md:shadow-none   z-50 `}
      >
        {!isMobile && (
          <Link
            to="/"
            className="flex items-center justify-center mt-4 mb-3 border-black"
          >
            <BsFillEyeFill size={15} className="mr-1 " />
            <h1 className="text-lg uppercase text-black font-medium">
              <span>Anime</span>
              <span>Stream</span>
            </h1>
          </Link>
        )}
        <div className="md:hidden absolute top-2 right-4 text-red-dark hover:text-red-400 bg-transparent transition ">
          <button onClick={closeSideBar}>
            <FaTimes size={25} />
          </button>
        </div>
        {/* <div className="hidden   text-black text-xs text-center sm:hidden">MENU</div> */}
        <div className="flex flex-col gap-4 mt-4 ml-4 px-4">
          <Link
            to="/"
            className="flex gap-3 items-center hover:text-gray-700 transition duration-300"
          >
            <AiOutlineHome size={25} />
            <p>Home</p>
          </Link>

          <Link
            to="/explore"
            className="flex gap-3 items-center hover:text-gray-700 transition duration-300"
          >
            <MdOutlineExplore size={25} />
            <p>Discover</p>
          </Link>

          <Link
            to="/search"
            className="flex gap-3 items-center hover:text-gray-700 transition duration-300"
          >
            <BiSearch size={25} />
            <p>Search</p>
          </Link>
        </div>

        {/* <div className="text-black text-lg text-center mt-2">LIBRARY</div> */}
        <div className="flex flex-col gap-4 mt-4 ml-4 px-4">
          <button
            onClick={() => privateUrlhandler("/bookmarks")}
            className="flex gap-3 items-center hover:text-gray-700 transition duration-300"
          >
            <BsBookmarkHeart size={25} />
            <p>Bookmarked</p>
          </button>

          <button
            onClick={() => privateUrlhandler("/recent")}
            className="flex gap-3 items-center hover:text-gray-700 transition duration-300"
          >
            <AiOutlineHistory size={25} />
            <p>Recent</p>
          </button>

          <Link
            to="/top-rated"
            className="flex gap-3 items-center hover:text-gray-700 transition duration-300"
          >
            <AiOutlineStar size={25} />
            <p>Top Rated</p>
          </Link>
        </div>
        {/* 
        <div className="text-black text-lg font-medium mt-4 text-center">
          Categories
        </div> */}
        <div className="flex flex-col gap-4 mt-4 ml-4 px-4">
          <Link
            to="tv-shows"
            className="flex gap-3 items-center hover:text-gray-700 transition duration-300"
          >
            <RiSlideshow4Line size={25} />
            <p>Tv Shows</p>
          </Link>

          <Link
            to="movies"
            className="flex gap-3 items-center hover:text-gray-700 transition duration-300"
          >
            <BsCameraVideo size={25} />
            <p>Movies</p>
          </Link>

          <Link
            to="/anime"
            className="flex gap-3 items-center hover:text-gray-700 transition duration-300"
          >
            <FiAnchor size={25} />
            <p>Anime</p>
          </Link>
        </div>

        {/* <div className="text-black ttext-lg font-medium text-center mt-2">GENERAL</div> */}
        <div className="flex flex-col gap-4 mt-4 ml-4 px-4">
          <button
            onClick={() => privateUrlhandler("/profile")}
            className="flex gap-3 items-center "
          >
            <BiUserCircle size={25} />
            <p> Profile </p>
          </button>

          <button
            className="flex gap-3 items-center "
            onClick={() =>
              dispatch(
                setCurrentUser({
                  displayName: "Guest",
                  email: "guest@gmail.com",
                  emailVerified: true,
                  photoURL: "https://i.ibb.co/stB42Nb/catface-5.jpg",
                  uid: "D3xcrHOuQ7fI2kPPH8eljwUrqcH2",
                })
              )
            }
          >
            <HiOutlineLogin size={25} />
            <p>Demo Login</p>
          </button>

          {currentUser ? (
            <button
              onClick={signOutHandler}
              className="flex gap-3 items-center "
            >
              <HiOutlineLogin size={25} />
              <p> Logout</p>
            </button>
          ) : (
            <Link
              to={`/auth?redirect=${encodeURIComponent(location.pathname)}`}
              className="flex gap-3 items-center "
            >
              <HiOutlineLogin size={25} />
              <p> Login</p>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
