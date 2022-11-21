import React, { useState, useEffect, useMemo } from "react";
import { v3 } from "../api/axios";
import requests from "../api/requests";

export default function Banner() {
  console.log("Banner");
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    console.log("fetchData");
    let count = 0;
    try {
      const response = await v3.get(requests.fetchNowPlaying);
      if (response.status === 200) {
        count = 0;
        const movieId =
          response.data.results[
            Math.floor(Math.random() * response.data.results.length)
          ]?.id;
        fetchMovieDetail({ id: movieId });
      }
    } catch (error) {
      if (count > 3) return;
      count += 1;
      fetchData();
    }
  }

  async function fetchMovieDetail({ id }) {
    console.log("fetchMovieDetail");
    let count = 0;
    try {
      const response = await v3.get(`movie/${id}`, {
        params: { append_to_response: "videos" },
      });
      if (response.status === 200) {
        count = 0;
        setMovie(response.data);
      }
    } catch (error) {
      if (count > 3) return;
      count += 1;
      fetchMovieDetail();
    }
  }

  return <div>Banner</div>;
}
