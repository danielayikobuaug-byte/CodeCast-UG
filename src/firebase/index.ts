'use client';

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './config';

export function initializeFirebase() {
  const isNewApp = getApps().length === 0;
  const firebaseApp = isNewApp ? initializeApp(firebaseConfig) : getApp();

  // Persistent local cache lets onSnapshot resolve instantly from disk on
  // repeat visits (e.g. the Navbar/Footer logo) instead of always waiting
  // on a network round trip, falling back to a live fetch when stale.
  const firestore = isNewApp
    ? initializeFirestore(firebaseApp, {
        localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
      })
    : getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  return { firebaseApp, firestore, auth };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './auth/use-user';
export * from './use-memo-firebase';
