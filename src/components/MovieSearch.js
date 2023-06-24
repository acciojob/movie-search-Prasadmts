import React, { useState } from 'react';
import axios from 'axios';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = () => {
    axios.get(`http://www.omdbapi.com/?s=${query}&apikey=YOUR_API_KEY`)
      .then(response => {
        if (response.data.Response === 'True') {
          setMovies(response.data.Search);
          setError('');
        } else {
          setMovies([]);
          setError('Invalid movie name. Please try again.');
        }
      })
      .catch(error => {
        setMovies([]);
        setError('Error occurred. Please try again.');
        console.error(error);
      });
  };

  return (
    <div>
      <input type="text" value={query} onChange={event => setQuery(event.target.value)} />
      <button onClick={handleSearch}>Search</button>
      {error && <p className="error">{error}</p>}
      {movies.length > 0 ? (
        <ul>
          {movies.map(movie => (
            <li key={movie.imdbID}>
              <div>
                <img src={movie.Poster} alt={movie.Title} />
              </div>
              <div>
                <p>{movie.Title}</p>
                <p>{movie.Year}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default MovieSearch;
