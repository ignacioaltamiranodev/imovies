export const episodeRuntime = (item) => {
  if (item?.episode_run_time.length === 1) {
    const runtime =
      `${Math.floor(item?.episode_run_time / 60)}` < 1
        ? `${Math.floor(item?.episode_run_time)} min`
        : `${Math.floor(item?.episode_run_time / 60)}h :${
            item?.episode_run_time % 60
          } min`;
    return runtime;
  } else if (item?.episode_run_time.length === 0) {
    return;
  } else {
    const runtime =
      `${Math.floor(item?.episode_run_time[0] / 60)}` < 1
        ? `${Math.floor(item?.episode_run_time[0])} min`
        : `${Math.floor(item?.episode_run_time[0] / 60)}h :${
            item?.episode_run_time[0] % 60
          } min`;
    return runtime;
  }
};

export const movieRuntime = (item) => {
  const runtime =
    `${Math.floor(item?.runtime / 60)}` < 1
      ? `${Math.floor(item?.runtime)} min`
      : `${Math.floor(item?.runtime / 60)} h : ${item?.runtime % 60} min`;
  return runtime;
};

export const heroInfo = [
  {
    id: 496243,
    url: ' https://image.tmdb.org/t/p/original/hiKmpZMGZsrkA3cdce8a7Dpos1j.jpg',
    title: 'Parasite',
    text:
      'All unemployed, Ki-taek`s family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.',
    genres: [{ name: 'Thriller' }, { name: 'Drama' }, { name: 'Comedy' }],
  },
  {
    id: 680,
    url: ' https://image.tmdb.org/t/p/original/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg',
    title: 'Pupl Fiction',
    text:
      'A burger-loving hit man, his philosophical partner, a drug-addled gangster`s moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.',
    genres: [{ name: 'Thriller' }, { name: 'Crime' }],
  },
  {
    id: 155,
    url: ' https://image.tmdb.org/t/p/original/pbEkjhdfP7yuDcMB78YEZwgD4IN.jpg',
    title: 'The Dark Knight',
    text:
      'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.',
    genres: [
      { name: 'Drama' },
      { name: 'Action' },
      { name: 'Crime' },
      { name: 'Thriller' },
    ],
  },
  {
    id: 500,
    url: ' https://image.tmdb.org/t/p/original/jqFjgNnxpXIXWuPsyfqmcLXRo9p.jpg',
    text:
      'A botched robbery indicates a police informant, and the pressure mounts in the aftermath at a warehouse. Crime begets violence as the survivors -- veteran Mr. White, newcomer Mr. Orange, psychopathic parolee Mr. Blonde, bickering weasel Mr. Pink and Nice Guy Eddie -- unravel.',
    title: 'Reservoir Dogs',
    genres: [{ name: 'Crime' }, { name: 'Thriller' }],
  },
];
