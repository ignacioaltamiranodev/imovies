/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useSession, getSession } from 'next-auth/react';
import { useWatchlistContext } from '../context/watchlistContext';
import { AiFillDelete, AiFillStar } from 'react-icons/ai';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase.config';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { btnStyle, episodeRuntime, movieRuntime } from '../utils/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import Image from 'next/image';

const WatchlistPage = () => {
  const { watchlist } = useWatchlistContext();
  const { data: session } = useSession();
  const { back } = useRouter();

  const removeFromWatchlist = async (item) => {
    const docRef = doc(db, 'watchlist', session?.user?.uid);
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
      <div className="sm:mx-0 mx-4">
        <button className={`${btnStyle} mb-6`} onClick={() => back()}>
          Go back
        </button>
      </div>
      {watchlist.length < 1 && (
        <div className="text-center flex items-center justify-center h-[50vh] flex-col sm:mx-0 mx-4 sm:text-lg text-sm">
          <i className="text-[6rem] text-primary-color">
            <MdOutlineAddCircleOutline />
          </i>
          <h2 className="my-2">Your watchlist is empty.</h2>
          <p>
            Add movies and shows to your Watchlist to keep track of what you
            want to watch.
          </p>
          <Link href="/movie">
            <a className="text-primary-color text- mt-2 mb-0">Browse Movies</a>
          </Link>
          <Link href="/tv">
            <a className="text-primary-color text-">Browse TV Shows</a>
          </Link>
        </div>
      )}
      <AnimatePresence>
        {watchlist.map((item) => (
          <motion.article
            initial="hidden"
            animate="show"
            exit="exit"
            variants={animateCard}
            className="lg:w-3/5 w-full mx-auto flex border-b p-4 sm:h-[25vh] h-[35vh]"
            key={item.id}
          >
            <div className="flex sm:w-1/4 w-1/2 justify-center items">
              <Link
                href={
                  item.media === 'movie' ? `movie/${item.id}` : `/tv/${item.id}`
                }
              >
                <Image
                  className="cursor-pointer h-full"
                  src={item.image}
                  alt={item.title}
                  height={150}
                  width={150}
                />
              </Link>
            </div>
            <div className="w-full flex">
              <div className="ml-4 sm:text-lg">
                <div className="flex items-center">
                  <Link
                    href={
                      item.media === 'movie'
                        ? `movie/${item.id}`
                        : `tv/${item.id}`
                    }
                  >
                    <h2 className="cursor-pointer">
                      {item.name || item.title}
                    </h2>
                  </Link>
                  <span className="ml-2 sm:block hidden">
                    (
                    {item.first_air_date?.slice(0, 4) ||
                      item.release_date?.slice(0, 4)}
                    )
                  </span>
                  <i className="ml-2 text-[#cda83b] sm:block hidden">
                    <AiFillStar />
                  </i>
                  <span className="ml-1 sm:block hidden">
                    {' '}
                    {item.rating.toFixed(1)}
                  </span>
                  <i
                    className="cursor-pointer ml-auto text-xl hover:text-primary-color transition-all ease-in duration-200"
                    onClick={() => removeFromWatchlist(item)}
                  >
                    <AiFillDelete />
                  </i>
                </div>
                <div className="flex items-center text-sm my-2">
                  <span className={item.media === 'movie' ? 'mr-4' : ''}>
                    {item.episode_run_time
                      ? episodeRuntime(item)
                      : movieRuntime(item)}
                  </span>
                  {item.media === 'tv' && (
                    <>
                      <span
                        className={
                          item?.episode_run_time.length !== 0 && 'ml-4'
                        }
                      >
                        TV Series
                      </span>
                      <span className="border-r mx-4 h-4  sm:block hidden"></span>
                      <span className="sm:block hidden">
                        {item?.episodes_number}eps
                      </span>
                      {
                        <span className="border-r mx-4 h-4 sm:block hidden"></span>
                      }
                    </>
                  )}
                  {item.genres.slice(0, 3).map((genre) => (
                    <span className="mr-4 sm:block hidden" key={genre?.id}>
                      {genre.name}
                    </span>
                  ))}
                </div>
                {item.cast.slice(0, 3).map((member) => (
                  <article key={member.id} className="sm:inline-block hidden">
                    <h5 className="text-sm sm:inline-block hidden">
                      {`${member.name}`}&nbsp;
                    </h5>
                    {member.order < 2 && (
                      <span className="sm:inline-block hidden">,</span>
                    )}
                  </article>
                ))}
                <p className="my-2">{item.overview.split('. ')[0] + '.'}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </AnimatePresence>
    </main>
  );
};

export default WatchlistPage;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
