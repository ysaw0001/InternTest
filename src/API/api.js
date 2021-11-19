import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
const API_KEY = '28f4dae9'
const BASE_URL = 'http://www.omdbapi.com'
export async function searchMovieByTitle(movieTitle) {
  let response = await axios.get(
    'http://www.omdbapi.com/?&apikey=' + 
      API_KEY +
      '&s='+ movieTitle,
  );

  return response.data;
}

export async function getMovieByTitle(movieTitle) {
    let response = await axios.get(
      'http://www.omdbapi.com/?&apikey=' + 
        API_KEY +
        '&t='+ movieTitle,
    );
  
    return response.data;
  }