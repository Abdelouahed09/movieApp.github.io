import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";
import { BsFilm } from "react-icons/bs";

const MOVIES_API = `https://api.themoviedb.org/3/movie/popular?api_key=58e0be201a84cc581c4304b5ab5ec0d4&language=en-US&page=1`;

const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=58e0be201a84cc581c4304b5ab5ec0d4&query=`;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getMovies(MOVIES_API);
  }, []);

  const handleOnChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (searchValue.trim()) {
      getMovies(SEARCH_API + searchValue);
    } else {
      getMovies(MOVIES_API);
    }
  }, [searchValue]);

  const resetSearchValue = () => {
    setSearchValue("");
  };

  return (
    <>
      <header style={{ padding: "20px" }}>
        <BsFilm
          className="logo"
          onClick={resetSearchValue}
          style={{ cursor: "pointer" }}
        />
        <input
          className="search"
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={handleOnChange}
        />
      </header>

      <div className="container">
        <h1>MovieApp for you all the time</h1>
        <p>
          This MovieApp is an authoritative source for movie, TV and celebrity
          content. Find ratings and reviews for the newest movie and TV shows.
        </p>
      </div>

      <div className="App">
        {movies?.map((movie) => (
          <Movie {...movie} key={movie.id} />
        ))}
      </div>
    </>
  );
}

export default App;
