import React from 'react';
import { useParams } from 'react-router';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';

//project import
import ReportCard from './Dashboard/Default/ReportCard';

import { gridSpacing } from 'config.js';

// assets
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import { getMovieList, getSearchMovie } from '../store/Api';

// ==============================|| DASHBOARD DEFAULT ||============================== //

const Default = () => {
  const theme = useTheme();
  const params = useParams();

  const [movieList, setMovieList] = React.useState([]);

  React.useEffect(() => {
    if (params.keyword !== undefined && params.keyword != '') {
      getSearchMovie(params.keyword).then((result) => {
        setMovieList(result);
      });
    } else {
      getMovieList().then((result) => {
        setMovieList(result);
      });
    }
  }, [params.keyword]);

  const list = movieList.map((movie) => {
    return (
      <Grid item lg={3} sm={6} xs={12} key={movie.id}>
        <ReportCard
          primary={movie.title}
          secondary={movie.release_date}
          color={theme.palette.primary.main}
          footerData={'Popularity ' + movie.popularity.toString()}
          imageMovie={`${import.meta.env.VITE_APP_API_URL_IMAGE}${movie.poster_path}`}
          iconFooter={TrendingUpIcon}
          movieId={movie.id}
        />
      </Grid>
    );
  });

  const rows = (
    <Grid container spacing={gridSpacing}>
      {list}
    </Grid>
  );

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        {rows}
      </Grid>
    </Grid>
  );
};

export default Default;
