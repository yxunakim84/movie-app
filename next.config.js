/** @type {import('next').NextConfig} */

const API_KEY = process.env.API_KEY;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return[
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      },
      {
        source: "/api/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`
      },
      {
        source: "/api/tvShows",
        destination: `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
      },
      {
        source: "api/trending/movies",
        destination: `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
      },
      {
        source: "api/trending/tv",
        destination: `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`
      },
    ]
  }
}

module.exports = nextConfig
