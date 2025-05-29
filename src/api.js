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

export const setWatchlist = async (movieId, add) => {
  const bodyReq = { media_type: 'movie', media_id: movieId, watchlist: add };
  const config = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_APP_API_TOKEN}`
    },
    body: { bodyReq }
  };

  const url = `${import.meta.env.VITE_APP_API_URL}account/20662767/watchlist`;

  const { data } = await axios.post(url, bodyReq, config);

  return data;
};

export const getWatchlist = async () => {
  const config = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_APP_API_TOKEN}`
    }
  };

  const url = `${import.meta.env.VITE_APP_API_URL}account/20662767/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc`;

  const watch = await axios.get(url, config);
  return watch.data.results;
};