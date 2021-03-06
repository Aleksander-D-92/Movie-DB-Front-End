import React, {MouseEvent} from "react";
import {useHistory} from 'react-router-dom';
import {MovieDetails} from "../../services/the_movie_db/MovieService";
import Carousel from "react-multi-carousel";
import {SMALL_CAROUSEL_RESPONSIVE} from "../../shared/utils/variables";
import {Card, CardHeader, CardMedia, Grid, Tooltip, Typography} from "@material-ui/core";
import {formatDate} from "../../shared/utils/functions";
import {NoFavorite} from "./NoFavorite";

interface Props {
    movies?: MovieDetails[]
}

function FavoriteMovieCarousel(props: Props) {
    const history = useHistory();
    const imageBasePath = 'https://image.tmdb.org/t/p/w780';

    function redirect(e: MouseEvent) {
        history.push(`/movies/${e.currentTarget.id}`)
    }

    return (
        <>
            <Typography variant={'h3'} align={'center'} className={'mt-4'}>Favorite Movies</Typography>
            <Carousel responsive={SMALL_CAROUSEL_RESPONSIVE}>
                {props.movies !== undefined ? props.movies.map(movie => {
                    return <Grid container={true} justify={'center'} key={movie.id}>
                        <Grid item={true} xs={12} md={11}>
                            <Card className={'mt-2 mb-4 landingPageSmallCard'}
                                  elevation={10}
                                  style={{height: 565}}>
                                <CardHeader
                                    titleTypographyProps={{variant: 'h6'}}
                                    title={movie.title}
                                    subheader={`Release Date: ${formatDate(movie.release_date)}`}
                                />
                                <Tooltip title={"Double Click to see details"}
                                         placement={'top'}
                                         arrow={true}>
                                    <CardMedia className={'landingPageSmallImage'}
                                               id={`${movie.id}`}
                                               onDoubleClick={redirect}
                                               style={{height: 480}}
                                               image={imageBasePath + movie.backdrop_path}
                                    />
                                </Tooltip>
                            </Card>
                        </Grid>
                    </Grid>
                }) : ''}
            </Carousel>
            {(props.movies === undefined || props.movies.length <= 0) && <NoFavorite text={'No Favorite Movies'}/>}
        </>
    )
}

export {FavoriteMovieCarousel}
