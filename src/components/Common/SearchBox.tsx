import {
  useState,
  FunctionComponent,
  useRef,
  useEffect,
  FormEvent,
} from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { getSearchKeyWord } from "../../services/search";

interface SearchBoxProps {
  autoFocus?: boolean;
}

let initialState = true;

const SearchBox: FunctionComponent<SearchBoxProps> = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("query") || ""
  );
  const timeOutRef = useRef<any>(null);
  const [suggestion, setSuggestion] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (timeOutRef.current) clearTimeout(timeOutRef.current);

    setSuggestion([]);

    if (!searchInput.trim()) return;

    timeOutRef.current = setTimeout(async () => {
      const keywords = await getSearchKeyWord(searchInput.trim());
      setSuggestion(keywords);

      if (initialState) {
        initialState = false;
        setSuggestion([]);
      }
    }, 300);

    return () => clearTimeout(timeOutRef.current);
  }, [searchInput]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    if (!searchInput.trim()) return;

    navigate(`/search?query=${encodeURIComponent(searchInput.trim())}`);
    clearTimeout(timeOutRef.current);
    setSuggestion([]);
  };

  useEffect(() => {
    setSuggestion([]);
    clearTimeout(timeOutRef.current);
  }, [location.search]);

  return (
    <div className="absolute rounded-full z-20 mt-5 top-10 left-7 right-6 bg-dark-lighten ">
      <form className="relative">
        <button className="absolute top-1/2 -translate-y-1/2 left-5 text-white">
          <FaSearch size={25} className="" />
        </button>

        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full pl-14 pr-7 outline-none  bg-transparent placeholder-white py-4 text-white"
        />
      </form>
    </div>
  );
};

export default SearchBox;
