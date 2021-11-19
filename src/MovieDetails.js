import React, {
    useState,
    useEffect,
  } from 'react';
import { View, Text, Image } from 'react-native'
import { getMovieByTitle } from './API/api';

const MovieDetails = ({ navigation, route }) => {
    const [movie, setMovie] = useState('')
    useEffect(() => {
        if (route.params?.movie) {
            let movieTitle = route.params.movie.Title
            getMovieByTitle(movieTitle).then((res)=>{
                if(res.Response === 'True'){
                    setMovie(res)
                  console.log(res)
                }else{
                  console.log(false)
                }
            })
        }
      }, [route.params?.movie]);

    return (
        <View>
            <Image source={{uri: movie.Poster}}
                    style={{width: 400, height: 400}} />
            <Text>{movie.Title}</Text>
            <Text>{movie.Year}</Text>
            <Text>{movie.Genre}</Text>
            <Text>{movie.imdbRating}</Text>
            <Text>{movie.Plot}</Text>
        </View>
    )
}

export default MovieDetails
