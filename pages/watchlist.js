/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link';
import { useWatchlist } from '../context/watchlistContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase.config';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import Image from 'next/image';
import { useAuth } from '../context/authContext';
import { useEffect } from 'react';
import useRedirectAfterSeconds from '../custom-hooks/useRedirectAfterSeconds';
import Loader from '../components/Loader';

const WatchlistPage = () => {
  const { watchlist } = useWatchlist();
  const { user } = useAuth();
  const { back, push } = useRouter();
  const { redirect } = useRedirectAfterSeconds();

  useEffect(() => {
    if (redirect) {
      push(`/login`);
    }
  }, [redirect]);

  const removeFromWatchlist = async (item) => {
    const docRef = doc(db, 'watchlist', user?.uid);
    await setDoc(
      docRef,
      {
        items: watchlist.filter((element) => element.id !== item?.id),
      },
      { merge: 'true' }
    );
    toast.success(`${item?.name || item?.title} removed from your watchlist`);
  };

  const animateCard = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
    },
    exit: { opacity: 0 },
  };

  return (
    <main className="container mx-auto my-6">
      {user ? (
        <>
          <div className="sm:mx-0 mx-4">
            <button
              className={`btn bg-primary-color hover:bg-secondary-color`}
              onClick={() => back()}
            >
              Go Back
            </button>
            <h2 className="text-3xl mt-4 mb-3 border-primary-color border-b-4 inline-block py-1">
              Your Watchlist
            </h2>
          </div>
          {watchlist.length < 1 && (
            <section className="text-center flex items-center justify-center h-[50vh] flex-col sm:mx-0 mx-4 sm:text-xl text-base">
              <i className="text-[6rem] text-primary-color">
                <MdOutlineAddCircleOutline />
              </i>
              <h2 className="my-2">Your watchlist is empty.</h2>
              <p>
                Add movies and shows to your Watchlist to keep track of what you
                want to watch.
              </p>
              <Link
                className="text-primary-color hover:text-secondary-color mt-2 mb-0"
                href="/movie"
              >
                Browse Movies
              </Link>
              <Link
                className="text-primary-color hover:text-secondary-color"
                href="/tv"
              >
                Browse TV Shows
              </Link>
            </section>
          )}
          <section className="sm:flex flex-wrap">
            <AnimatePresence>
              {watchlist.map((item) => (
                <motion.article
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  variants={animateCard}
                  key={item.id}
                >
                  <div className="flex flex-col md:items-start items-center justify-center p-2 mx-auto max-w-[300px] ">
                    <Link
                      href={
                        item.media === 'movie'
                          ? `movie/${item.id}`
                          : `/tv/${item.id}`
                      }
                    >
                      <Image
                        className="cursor-pointer h-full"
                        src={item.image}
                        alt={item.title}
                        height={300}
                        width={300}
                      />
                    </Link>
                    <div className="flex items-center justify-between w-full mt-2">
                      <Link
                        className="text-lg font-bold hover:text-white"
                        href={
                          item?.media === 'movie'
                            ? `movie/${item?.id}`
                            : `tv/${item?.id}`
                        }
                      >
                        {item?.name || item?.title}
                      </Link>
                      <button
                        className="btn px-2 py-1 bg-secondary-color"
                        onClick={() => removeFromWatchlist(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </section>
        </>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default WatchlistPage;
