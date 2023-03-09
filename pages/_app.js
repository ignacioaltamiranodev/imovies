import Navbar from '../components/Navbar';
import '../styles/globals.scss';
import Loader from '../components/Loader';
import { useState } from 'react';
import Router from 'next/router';
import { SWRConfig } from 'swr';
import { motion } from 'framer-motion';
import axios from 'axios';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';
import HamburgerMenu from '../components/HamburgerMenu';
import { WatchlistProvider } from '../context/watchlistContext';
import { AuthProvider } from '../context/authContext';
import { Raleway } from 'next/font/google';

const fetcher = async (url) => await axios.get(url).then((res) => res.data);

const raleway = Raleway({ subsets: ['latin'] });

const pageVariant = {
  pageInitial: { opacity: 0 },
  pageAnimate: { opacity: 1 },
};

function MyApp({ Component, pageProps: { ...pageProps }, router }) {
  const [loading, setLoading] = useState(false);

  Router.events.on('routeChangeStart', (url) => {
    setLoading(true);
  });
  Router.events.on('routeChangeComplete', (url) => {
    setLoading(false);
  });
  return (
    <AuthProvider>
      <WatchlistProvider>
        <motion.div
          className={raleway.className}
          key={router.router}
          initial="pageInitial"
          animate="pageAnimate"
          variants={pageVariant}
        >
          <SWRConfig
            value={{
              refreshInterval: 2000,
              revalidateOnMount: true,
              fetcher,
            }}
          >
            <Toaster />
            <Navbar />
            {loading ? <Loader /> : <Component {...pageProps} />}
            <HamburgerMenu />
            <Footer />
          </SWRConfig>
        </motion.div>
      </WatchlistProvider>
    </AuthProvider>
  );
}

export default MyApp;
