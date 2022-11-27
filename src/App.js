import React, { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const Api_Key = "c032e2d7";
//95ad0d
const API_URL = `https://www.omdbapi.com?apikey=${Api_Key}`;
//const API_URL = `https://www.omdbapi.com/?i=tt3896198&apikey=${Api_Key}`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    //The previous Link is from api  just made for search like
    //https://www.omdbapi.com?apikey=asdasfaf&s=spiderman
    //this link give u all things for spiderman or anything written in repla  ce
    const data = await response.json();
    //here we parse the data to json form so we can read
    setMovies(data.Search);
    console.log(data);
    //after parse we saw that the array that we need is inside object called search
    //that's why we  make data.search to get all the movies for the title
  };

  useEffect(() => {
    searchMovies(searchTerm);
    //what we right inside the useEffect is made with every reload
    //that's why any  fetch  must be inside useEffect
    // and we here execute the function with the specific titel
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handler = (e) => {
    if (e.key === "Enter") {
      searchMovies(searchTerm);
    }
    if (e.key === "Escape") {
      setSearchTerm("");
      searchMovies("");
    }
  };
  return (
    <div className="app">
      <h1>Online Cinema</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          // onKeyPress={(e) => handler(e)}
          onKeyDown={(e) => handler(e)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            searchMovies(searchTerm);
          }}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
