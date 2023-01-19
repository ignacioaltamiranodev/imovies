import React, { useEffect, useRef } from 'react';

const Video = ({ video }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px';
    iframeRef.current.setAttribute('height', height);
  }, []);

  return (
    <article className="sm:mx-0 mx-4 mt-6" key={video.id}>
      <h2 className="font-bold text-2xl mb-6">{video.name}</h2>
      <iframe
        src={`https://www.youtube.com/embed/${video.key}`}
        ref={iframeRef}
        width="100%"
        title="video"
      ></iframe>
    </article>
  );
};

export default Video;
