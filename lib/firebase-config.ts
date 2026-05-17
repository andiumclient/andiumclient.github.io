/**
 * Firebase project: andium-e57a1
 *
 * These values are safe to commit — Firebase web config keys are designed to be
 * exposed in client code. Real security is enforced by Realtime Database rules
 * (set in the Firebase console under Realtime Database → Rules).
 */
export const firebaseConfig = {
  apiKey: 'AIzaSyCaEK_aHZB_6uXAi8D5RXFoqmRXJeOJmWE',
  authDomain: 'andium-e57a1.firebaseapp.com',
  databaseURL: 'https://andium-e57a1-default-rtdb.firebaseio.com',
  projectId: 'andium-e57a1',
  storageBucket: 'andium-e57a1.firebasestorage.app',
  messagingSenderId: '405176849853',
  appId: '1:405176849853:web:6e7f5a7369eb275f23eed4'
};

export const isFirebaseConfigured = () =>
  Boolean(firebaseConfig.apiKey && firebaseConfig.databaseURL);
