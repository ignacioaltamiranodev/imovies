import { MdSearchOff } from 'react-icons/md';

const NoResults = ({ term }) => {
  return (
    <section className="flex flex-col items-center justify-center order-2 w-full p-4 text-center my-4 min-h-[62.5vh]">
      <i className="text-[6rem] text-primary-color mb-4">
        <MdSearchOff />
      </i>
      <h2 className="text-2xl">No results found for {`"${term}"`}.</h2>
    </section>
  );
};

export default NoResults;
