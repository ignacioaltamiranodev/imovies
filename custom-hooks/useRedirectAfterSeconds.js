import { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';

export default function useRedirectAfterSeconds(seconds = 3) {
  const [secondsRemaining, setSecondsRemaining] = useState(seconds);
  const [redirect, setRedirect] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);

    if (secondsRemaining < 0) {
      clearInterval(interval);
    }

    if (!user && secondsRemaining == 0) {
      setRedirect(true);
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [secondsRemaining, user]);

  return { redirect };
}
