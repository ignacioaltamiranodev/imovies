import Hero from './Hero';
import SliderSection from './SliderSection';

const Home = ({ data }) => {
  return (
    <main className="container mx-auto my-6">
      <Hero data={data} />
      <SliderSection data={data} />
    </main>
  );
};

export default Home;
