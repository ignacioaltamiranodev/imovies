import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../context/authContext';

const HamburgerMenu = () => {
  const { user } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpenMenu((prev) => !prev)}
        className={openMenu ? 'hamburger is-active' : 'hamburger'}
      >
        <div className="bar"></div>
      </button>
      <div
        className={` ${
          openMenu
            ? 'opacity-1  -translate-x-0  pointer-events-all'
            : ' opacity-0  -translate-x-[100%] pointer-events-none'
        } fixed top-0 left-0 w-[100%] h-[100%] flex justify-center items-center flex-col z-[899] bg-primary-color transition-all ease-in duration-300`}
        onClick={() => {
          openMenu && setOpenMenu(false);
        }}
      >
        <Link className="text-white mb-4 text-3xl" href="/">
          Home
        </Link>
        <Link className="text-white mb-4 text-3xl" href="/movie">
          Movies
        </Link>
        <Link className="text-white text-3xl" href="/tv">
          TV Series
        </Link>
        {user && (
          <Link className="text-white text-3xl mt-4" href="/watchlist">
            Watchlist
          </Link>
        )}
      </div>
    </>
  );
};

export default HamburgerMenu;
