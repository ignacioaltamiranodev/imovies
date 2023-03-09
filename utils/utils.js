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
