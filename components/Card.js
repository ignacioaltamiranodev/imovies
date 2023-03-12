import Link from 'next/link';
import Image from 'next/image';

const Card = ({ id, item, media }) => {
  const cardStyle =
    'rounded flex flex-col p-3 bg-primary-color transition-all ease-in duration-200 cursor-pointer relative';

  return (
    <article className={`${item.poster_path ? cardStyle : 'hidden'}`}>
      <span className="absolute text-sm p-1 rounded -right-0 -top-3 z-10 bg-secondary-color text-pr font-bol cursor-default">
        {item.vote_average.toFixed(1)}
      </span>
      <Link
        className="hover:text-white"
        href={media === 'movie' ? `/movie/${id}` : `/tv/${id}`}
      >
        <Image
          src={`https://image.tmdb.org/t/p/w780${item.poster_path}`}
          alt={item.title || item.name}
          width={400}
          height={400}
        />
        <h2 className="text-md text-center flex-wrap my-2">
          {item.title || item.name || item.original_title}
        </h2>
      </Link>
      <span className="text-md text-center capitalize">
        {item.release_date || item.first_air_date}
      </span>
    </article>
  );
};

export default Card;
