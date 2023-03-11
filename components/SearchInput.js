import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchInput = ({ media }) => {
  const [search, setSearch] = useState('');
  const { push } = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (search === '' || !search) return;
    push(`/search/${media}/${search}`);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <form
      className="bg-white rounded-full p-1 flex items-center justify-between md:w-1/3 w-3/4"
      onSubmit={handleSubmit}
    >
      <input
        className="py-2 inline-block rounded-full text-dark-blue h-full outline-0 text- w-full border-none focus:border-none"
        placeholder="Search"
        onChange={handleChange}
        value={search}
      />
      <button
        className={`p-2 bg-secondary-color inline-block rounded-full`}
        type="submit"
      >
        <AiOutlineSearch />
      </button>
    </form>
  );
};

export default SearchInput;
