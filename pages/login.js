import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/authContext';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const LoginPage = () => {
  const { logIn, user } = useAuth();
  const { push } = useRouter();

  if (user) {
    push('/');
  }

  const schema = yup.object().shape({
    email: yup
      .string()
      .matches(
        /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/,
        'Email is not valid.'
      )
      .required('Email is required.'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters.')
      .max(20, 'Password must be at most 20 characters.')
      .required('Password is required.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await logIn(data.email, data.password);
      push('/');
    } catch (error) {
      if (error.message === 'Firebase: Error (auth/user-not-found).') {
        toast.error('Login failed. Incorrect email or password.');
      }
    }
  };

  return (
    <div className="form-container">
      <form
        className="mx-auto p-4 container w-4/5 md:w-2/5 xl:w-1/4 h-2/3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="mb-4 text-center text-2xl">Log In</h2>
        <div className="mb-4 w-2/3">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            {...register('email')}
            className={errors ? '' : 'mb-4'}
          />
          {errors.email && (
            <p className="text-white my-2">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4 w-2/3">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            {...register('password')}
            className={errors ? '' : 'mb-4'}
          />
          {errors.password && (
            <p className="text-white mt-1 mb-4">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className={`btn bg-dark-blue hover:bg-secondary-color mt-4`}
        >
          Log In
        </button>
        <span className="mt-4">Not registered yet?</span>
        <Link className="mt-2 hover:text-darkbg-dark-blue" href="/signup">
          Create an account
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
