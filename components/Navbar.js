import Link from 'next/link';
import Image from 'next/image';
import { useWatchlist } from '../context/watchlistContext';
import { useAuth } from '../context/authContext';

const Navbar = () => {
  const { watchlist } = useWatchlist();
  const { user, logOut } = useAuth();

  return (
    <header className="h-[8vh] sticky top-0 bg-primary-color text-white flex md:p-0 p-5 z-50">
      <nav className="container flex items-center mx-auto">
        <Link className="sm:text-3xl text-xl mr-4 cursor-pointer" href="/">
          IMovies
        </Link>
        <div className="mr-auto lg:block hidden">
          <Link className="mr-4 text-lg" href="/">
            Home
          </Link>
          <Link className="mr-4 text-lg" href="/movie">
            Movies
          </Link>
          <Link className="text-lg" href="/tv">
            TV Series
          </Link>
          {user && (
            <Link className="text-lg ml-4" href="/watchlist">
              Watchlist
            </Link>
          )}
          {watchlist.length > 0 && user && (
            <span className="ml-2 bg-secondary-color px-[0.6rem] pb-1 text-lg rounded-[50%]">
              {watchlist.length}
            </span>
          )}
        </div>
        {user ? (
          <div className="flex items-center ml-auto">
            <h5 className="mr-4">
              {user?.username || user?.email?.split('@', 1)[0]}
            </h5>
            <div className="flex items-center">
              {user?.photoURL && (
                <Image
                  className="rounded-full"
                  src={user?.photoURL}
                  width={35}
                  height={35}
                  alt="Profile Image"
                />
              )}
              <button
                className={`btn bg-dark-blue hover:bg-secondary-color`}
                onClick={logOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center ml-auto">
            <Link
              className={`btn bg-dark-blue mr-4 hover:bg-secondary-color hover:text-white`}
              href="/login"
            >
              Log In
            </Link>
            <Link
              className={`btn bg-dark-blue  hover:bg-secondary-color hover:text-white`}
              href="/signup"
            >
              Sign In
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
