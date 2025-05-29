import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

// material-ui
import { Card, CardHeader, CardContent, Divider, Grid, Typography } from '@mui/material';

// project import
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';

// ==============================|| SAMPLE PAGE ||============================== //
import { getMovieDetail } from 'api';

const DetailMovie = () => {
  const params = useParams();

  const [movieDetail, setMovieDetail] = React.useState([]);
  const [movieGenres, setMovieGenres] = React.useState([]);
  const [movieLanguages, setMovieLanguages] = React.useState([]);
  const [movieCompanies, setMovieCompanies] = React.useState([]);

  React.useEffect(() => {
    getMovieDetail(params.movieId).then((result) => {
      setMovieDetail(result);
      setMovieGenres(result.genres);
      setMovieLanguages(result.spoken_languages);
      setMovieCompanies(result.production_companies);
      console.log(result);
    });
  }, [params.movieId]);

  return (
    <>
      <Breadcrumb title={movieDetail.original_title}>
        <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
          Movie Detail
        </Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={6}>
          <Card>
            <CardHeader
              title={
                <Typography component="div" className="card-header">
                  {movieDetail.tagline}
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <Typography>
                <img src={import.meta.env.VITE_APP_API_URL_IMAGE + movieDetail.poster_path} alt={movieDetail.original_title} width={650} />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardHeader
              title={
                <Typography component="div" className="card-header">
                  Detail
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <Typography>
                <b>Release Date : </b>
                {movieDetail.release_date}
              </Typography>
              <Typography>
                <b>Overview : </b>
                {movieDetail.overview}
              </Typography>
              <Typography>
                <b>Genres : </b>
                {movieGenres.map((genre) => {
                  return genre.name + ', ';
                })}
              </Typography>
              <Typography>
                <b>Spoken Languages : </b>
                {movieLanguages.map((lang) => {
                  return lang.english_name + ', ';
                })}
              </Typography>
              <Typography>
                <b>Production Cmpanies : </b>
                {movieCompanies.map((comp, i) => {
                  return comp.logo_path != null ? (
                    <Typography key={i}>
                      <img src={import.meta.env.VITE_APP_API_URL_IMAGE + comp.logo_path} alt={comp.name} width={150} key={i} />{' '}
                    </Typography>
                  ) : (
                    <Typography key={i}>{comp.name}</Typography>
                  );
                })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default DetailMovie;
