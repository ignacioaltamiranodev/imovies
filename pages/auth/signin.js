import { getProviders, signIn as SignIntoProvider } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';

const signIn = ({ providers }) => {
  return (
    <main className="text-white -[100vw] grid place-items-center">
      {Object.values(providers).map((provider) => (
        <motion.section
          whileTap={{ scale: 0.5 }}
          className="justify-center items-center flex   hover:bg-primary-color p-3 rounded-md bg-white text-black text-xs md:text-base cursor-pointer ease-in-out duration-300"
          key={provider.name}
        >
          <FcGoogle />
          <button
            onClick={() => SignIntoProvider(provider.id, { callbackUrl: '/' })}
          >
            &nbsp; Sign in with {provider.name}
          </button>
        </motion.section>
      ))}
    </main>
  );
};

export default signIn;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
