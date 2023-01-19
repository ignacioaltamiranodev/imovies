import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.googleClientId,
      clientSecret: process.env.googleSecret,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  adapter: FirestoreAdapter({
    apiKey: 'AIzaSyAiypt4iZKX3rcnBTYtbJs1JsnekVFQmNk',
    authDomain: 'imovies-f5112.firebaseapp.com',
    projectId: 'imovies-f5112',
    storageBucket: 'imovies-f5112.appspot.com',
    messagingSenderId: '986619579750',
    appId: '1:986619579750:web:c2e9a99af9fb6bdafe4ca7',
  }),
  callbacks: {
    async session({ session, user }) {
      session.user.tag = session.user.name
        .split(' ')
        .join('')
        .toLocaleLowerCase();

      session.user.uid = user.id;
      return session;
    },
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
});
