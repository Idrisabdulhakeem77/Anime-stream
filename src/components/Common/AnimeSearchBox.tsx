import { FormEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSearchParams, useParams } from "react-router-dom";

interface AnimeSerachBoxProps {}

const AnimeSearchBox = () => {
  const [searchInput, setSearchInput] = useState("");


  return (
    <div className="rounded-full  mt-5 bg-slate-300">
      <form>
        <button className="absolute translate-x-4 translate-y-4 text-light-gray ">
          <FaSearch size={25} />
        </button>

        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full pl-14 pr-7 outline-none  bg-transparent placeholder-dark-lighten py-4 text-black "
        />
      </form>
    </div>
  );
};

export default AnimeSearchBox;
