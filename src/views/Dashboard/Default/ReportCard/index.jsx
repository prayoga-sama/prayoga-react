import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { setWatchlist } from 'api';

// ==============================|| REPORT CARD ||============================== //

const ReportCard = ({ primary, secondary, imageMovie, color, footerData, iconFooter, movieId, disableButton, isWatchList }) => {
  const theme = useTheme();
  const [disBtn, setDisBtn] = React.useState(disableButton);
  
  const moviePoster = imageMovie ? <img src={imageMovie} alt={primary} width={295} /> : null;
  const IconFooter = iconFooter;
  const footerIcon = iconFooter ? <IconFooter /> : null;
  const url = '/detail/' + movieId;

  const addFavorite = async () => {
    const response = await setWatchlist(movieId, true);
    if (response.success == true) {
      alert(`Success Add ${primary} To Watchlist`);
      setDisBtn(true);
    } else {
      alert(`Failed Add ${primary} To Watchlist`);
    }
  };

  const removeFavorite = async () => {
    const response = await setWatchlist(movieId, false);
    if (response.success == true) {
      alert(`Success Remove ${primary} on Watchlist`);
      window.location.reload();
    } else {
      alert(`Failed Remove ${primary} on Watchlist`);
    }
  };

  const buttonAction = isWatchList == 0 ? removeFavorite : addFavorite;

  return (
    <Card>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography component={Link} to={url} variant="h3" sx={{ color: color }}>
              {primary}
            </Typography>
            <Typography variant="subtitle1" sx={{ marginTop: '.5rem' }}>
              {secondary}
            </Typography>
          </Grid>
          <Grid item>
            <Typography component={Link} to={url} variant="h2" sx={{ color: color }}>
              {moviePoster}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Box sx={{ background: color }}>
        <Grid
          container
          justifyContent="space-between"
          sx={{
            textAlign: 'center',
            padding: theme.spacing(1.2),
            pl: 2.5,
            pr: 2.5,
            color: theme.palette.common.white
          }}
        >
          <Grid item>
            <Typography variant="body2">{footerData}</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" startIcon={footerIcon} disabled={disBtn} onClick={buttonAction}>
              Watchlist
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ReportCard.propTypes = {
  primary: PropTypes.string,
  secondary: PropTypes.string,
  iconPrimary: PropTypes.object,
  footerData: PropTypes.string,
  iconFooter: PropTypes.object,
  color: PropTypes.string
};

export default ReportCard;
