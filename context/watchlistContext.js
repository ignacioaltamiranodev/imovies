import { createContext, useContext, useEffect, useState } from 'react';
import { onSnapshot, doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase.config';
import toast from 'react-hot-toast';
import { useAuth } from './authContext';

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      const docRef = doc(db, 'watchlist', user?.uid);
      var unsubscribe = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          setWatchlist(doc.data().items);
        }
      });
      setWatchlist([]);

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  const addShowToWatchlist = async (item, cast) => {
    if (!user) {
      toast.error('Please sign in to add an item to your watchlist.');
      return;
    }

    const docRef = doc(db, 'watchlist', user?.uid);
    try {
      const tvItem = {
        id: item?.id,
        title: item?.name,
        media: 'tv',
        rating: item?.vote_average,
        episode_run_time: item?.episode_run_time,
        overview: item?.overview,
        first_air_date: item?.first_air_date,
        cast: cast?.slice(0, 5),
        genres: item?.genres,
        episodes_number: item?.number_of_episodes,
        image: `https://image.tmdb.org/t/p/w780${item?.poster_path}`,
      };
      await setDoc(
        docRef,
        {
          items: watchlist ? [...watchlist, tvItem] : [tvItem],
        },
        { merge: 'true' }
      );
      toast.success(`${item?.name} added to your watchlist.`);
    } catch (err) {
      toast.error(err);
    }
  };

  const removeShowFromWatchlist = async (item) => {
    const docRef = doc(db, 'watchlist', user?.uid);
    await setDoc(
      docRef,
      {
        items: watchlist.filter((element) => element.id !== item?.id),
      },
      { merge: 'true' }
    );
    toast.success(`${item?.name} removed from your watchlist`);
  };

  const addMovieToWatchlist = async (item, cast) => {
    if (!user) {
      toast.error('Please sign in to add an item to your watchlist.');
      return;
    }

    const docRef = doc(db, 'watchlist', user?.uid);
    try {
      const movieItem = {
        id: item?.id,
        media: 'movie',
        title: item?.title,
        rating: item?.vote_average,
        runtime: item?.runtime,
        overview: item?.overview,
        release_date: item?.release_date,
        cast: cast?.slice(0, 5),
        genres: item?.genres,
        image: `https://image.tmdb.org/t/p/w780${item?.poster_path}`,
      };
      await setDoc(
        docRef,
        {
          items: watchlist ? [...watchlist, movieItem] : [movieItem],
        },
        { merge: 'true' }
      );
      toast.success(`${item?.title} added to your watchlist.`);
    } catch (err) {
      toast.error(err);
    }
  };

  const removeMovieFromWatchlist = async (item) => {
    const docRef = doc(db, 'watchlist', user?.uid);
    await setDoc(
      docRef,
      {
        items: watchlist.filter((element) => element.id !== item?.id),
      },
      { merge: 'true' }
    );
    toast.success(`${item?.title} removed from your watchlist`);
  };

  const value = {
    watchlist,
    addShowToWatchlist,
    removeShowFromWatchlist,
    addMovieToWatchlist,
    removeMovieFromWatchlist,
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  return useContext(WatchlistContext);
};
