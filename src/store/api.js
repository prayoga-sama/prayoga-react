import axios from 'axios';

export const getMovieList = async () => {
  const config = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_APP_API_TOKEN}`
    }
  };
  const url = `${import.meta.env.VITE_APP_API_URL}trending/movie/week`;

  const movie = await axios.get(url, config);
  return movie.data.results;
};

export const getSearchMovie = async (q) => {
  const config = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_APP_API_TOKEN}`
    }
  };

  const url = `${import.meta.env.VITE_APP_API_URL}search/movie?query=${q}&include_adult=false&language=en-US&page=1`;

  const search = await axios.get(url, config);
  return search.data.results;
};

export const getMovieDetail = async (movieId) => {
  const config = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_APP_API_TOKEN}`
    }
  };
  const url = `${import.meta.env.VITE_APP_API_URL}movie/${movieId}`;

  const movie = await axios.get(url, config);
  return movie.data;
};