import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';
import Breadcrumb from 'component/Breadcrumb';

//project import
import ReportCard from './Dashboard/Default/ReportCard';

import { gridSpacing } from 'config.js';

// assets
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import RemoveFromQueueIcon from '@mui/icons-material/RemoveFromQueue';

import { getMovieList, getSearchMovie, getWatchlist } from 'api';

// ==============================|| DASHBOARD DEFAULT ||============================== //

const Default = () => {
  const theme = useTheme();
  const params = useParams();

  const [movieList, setMovieList] = React.useState([]);
  const [buttonList, setButtonList] = React.useState(AddToQueueIcon);
  const [idWatchList, setIdWatchList] = React.useState([]);
  const [pageTitle, setPageTitle] = React.useState('Most Popular');

  React.useEffect(() => {
    getWatchlist().then((result) => {
      if (params.keyword == 'watchlist') {
        setPageTitle('Watchlist')
        setButtonList(RemoveFromQueueIcon);
        setMovieList(result);
      } else {
        result.map((list) => {
          idWatchList.push(list.id);
        });
        setIdWatchList(idWatchList);

        if (params.keyword !== undefined && params.keyword != '') {
          getSearchMovie(params.keyword).then((result) => {
            setPageTitle('Search : '+params.keyword);
            setButtonList(AddToQueueIcon);
            setMovieList(result);
          });
        } else {
          getMovieList().then((result) => {
            setPageTitle('Most Popular')
            setButtonList(AddToQueueIcon);
            setMovieList(result);
          });
        }
      }
    });
  }, [params.keyword]);

  const list = movieList.map((movie) => {
    var isWatchList = 0;
    var disableButton = false;
    if (params.keyword != 'watchlist') {
      isWatchList = idWatchList.find((wl) => {
        return wl == movie.id;
      });
      if (isWatchList !== undefined && isWatchList > 0) {
        disableButton = true;
      }
    }
    return (
      <Grid item lg={3} sm={6} xs={12} key={movie.id}>
        <ReportCard
          primary={movie.title}
          secondary={movie.release_date}
          color={theme.palette.primary.main}
          footerData={'Popularity ' + movie.popularity.toString()}
          imageMovie={`${import.meta.env.VITE_APP_API_URL_IMAGE}${movie.poster_path}`}
          iconFooter={buttonList}
          movieId={movie.id}
          disableButton={disableButton}
          isWatchList={isWatchList}
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
    <>
      <Breadcrumb title={pageTitle}>
        <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
          {pageTitle}
        </Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          {rows}
        </Grid>
      </Grid>
    </>
  );
};

export default Default;
