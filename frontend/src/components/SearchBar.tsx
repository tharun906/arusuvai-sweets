import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SearchBar.css";

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  }
  

function SearchBar({searchTerm, setSearchTerm}: SearchBarProps) {
    return (
      <div className="search-bar">
          <div className="icon"><FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "rgb(177, 177, 177)",}} /></div>
          <input
            type="text"
            placeholder="Search Category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
      </div>
    );
  }
  
  export default SearchBar;
