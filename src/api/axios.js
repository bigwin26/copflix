import axios from "axios";
const { REACT_APP_MOVIE_KEY } = process.env;

export const v3 = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: REACT_APP_MOVIE_KEY,
    language: "ko-KR",
  },
});
