import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Card from '../../components/Card';
import Loader from '../../components/Loader';

const PersonPage = ({ person, personMedia }) => {
  const [visible, setVisible] = useState(20);
  const { back } = useRouter();

  return (
    <main className="container mx-auto my-6">
      {!person ? (
        <Loader />
      ) : (
        <>
          <button
            className="btn bg-primary-color hover:bg-secondary-color mb-6 sm:mx-0 mx-4"
            onClick={() => back()}
          >
            Go Back
          </button>
          <section className="grid grid-cols-4 gap-4 sm:mx-auto mx-4">
            <div className="md:col-span-1 col-span-4">
              <Image
                width={300}
                height={300}
                src={`https://image.tmdb.org/t/p/w780/${person?.profile_path}`}
                alt={person?.name}
              />
            </div>
            <div className="md:col-span-3 col-span-4 flex flex-col justify-start">
              <h2 className="text-2xl font-bold mb-4">
                {person?.name} ({person?.birthday.slice(0, 4)})
              </h2>
              <p className="md:text-lg text-md">{person?.biography}</p>
            </div>
          </section>
          <section className="my-6 sm:mx-auto mx-4">
            <h2 className="text-3xl border-primary-color border-b-4 inline-block py-1">
              Credits
            </h2>
            <div className="card-grid my-6">
              {personMedia?.cast?.slice(0, visible).map((item) => (
                <Card
                  key={item.id}
                  id={item.id}
                  media={item.media_type}
                  item={item}
                />
              ))}
            </div>
            <div>
              <button
                className="btn hover:bg-secondary-color bg-primary-color mx-auto mt-6"
                onClick={() => setVisible((prev) => prev + 20)}
              >
                Load More
              </button>
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default PersonPage;

export async function getStaticPaths() {
  const { data: people } = await axios.get(
    `https://api.themoviedb.org/3/search/person?api_key=${process.env.API_KEY}&language=en-US&page=1&include_adult=false`
  );

  const paths = people.results.map((person) => ({
    params: { id: person.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { id } }) {
  const { data: person } = await axios.get(
    `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.API_KEY}&language=en-US`
  );

  const { data: personMedia } = await axios.get(
    `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${process.env.API_KEY}&language=en-US`
  );

  return {
    props: {
      person,
      personMedia,
    },
  };
}
