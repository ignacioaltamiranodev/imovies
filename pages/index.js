import axios from 'axios';
import Home from '../components/Home';
import Head from 'next/head';

export default function HomePage({
  trendingMoviesResults,
  trendingSeriesResults,
  topMoviesResults,
  topSeriesResults,
}) {
  const data = [
    {
      title: 'Trending Movies',
      section: trendingMoviesResults,
      media: 'movie',
    },
    {
      title: 'Trending Series',
      section: trendingSeriesResults,
      media: 'tv',
    },
    { title: 'Top Movies', section: topMoviesResults, media: 'movie' },
    { title: 'Top Series', section: topSeriesResults, media: 'tv' },
  ];

  return (
    <>
      <Head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <Home data={data} />
    </>
  );
}

export async function getServerSideProps() {
  const { data: trendingMovies } = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.API_KEY}`
  );
  const trendingMoviesResults = trendingMovies.results;

  const { data: trendingSeries } = await axios.get(
    `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.API_KEY}`
  );
  const trendingSeriesResults = trendingSeries.results;

  const { data: topMovies } = await axios.get(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}`
  );
  const topMoviesResults = topMovies.results;

  const { data: topSeries } = await axios.get(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}`
  );
  const topSeriesResults = topSeries.results;

  return {
    props: {
      trendingMoviesResults,
      trendingSeriesResults,
      topMoviesResults,
      topSeriesResults,
    },
  };
}
