import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useSWR from 'swr';
import Loader from '../components/Loader';
import SearchInput from '../components/SearchInput';
import Card from '../components/Card';
import toast from 'react-hot-toast';

const MoviesPage = () => {
  const [pageCount, setPageCount] = useState(1);
  const { back } = useRouter();

  const { data: tv, error } = useSWR(
    `https://api.themoviedb.org/3/discover/tv/?api_key=2a3efbbdcc66ed82dfbc4902bb7c157c&page=${pageCount}`
  );
  if (error) toast.error(error.message);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const prevPage = () => {
    if (pageCount < 1) return;
    setPageCount((prev) => prev - 1);
  };

  const nextPage = () => {
    setPageCount((prev) => prev + 1);
  };

  return (
    <main className="container mx-auto my-6">
      <section>
        <h2 className="text-xl text-center my-6">Discover TV Shows</h2>
        <div className="flex items-center justify-between sm:mx-0 mx-4">
          <SearchInput handleSubmit={handleSubmit} media="tv" />
          <button
            className={`btn bg-primary-color hover:bg-secondary-color`}
            onClick={() => back()}
          >
            Go Back
          </button>
        </div>
      </section>
      <section>
        <div className="my-6 card-grid">
          {!error && !tv ? (
            <Loader />
          ) : (
            tv?.results.map((item) => (
              <Card id={item.id} key={item.id} item={item} media="tv" />
            ))
          )}
        </div>
        <div className="flex justify-center items-center">
          {pageCount > 1 && (
            <button
              className={`btn p-3 bg-primary-color hover:bg-secondary-color mr-4`}
              onClick={prevPage}
            >
              Prev
            </button>
          )}
          <button
            className={`btn p-3 bg-primary-color hover:bg-secondary-color`}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
};

export default MoviesPage;
