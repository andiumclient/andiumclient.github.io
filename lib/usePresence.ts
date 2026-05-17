'use client';

import { useEffect, useState } from 'react';
import {
  onDisconnect,
  onValue,
  push,
  ref,
  serverTimestamp,
  set,
  remove
} from 'firebase/database';

import { getDb } from './firebase';

type PresenceState = {
  web: number | null;
  app: number | null;
};

/**
 * Subscribes the current visitor to the realtime presence list and returns
 * live counts of (web visitors, app users).
 *
 * Uses Firebase RTDB `onDisconnect()` so closing the tab removes the entry
 * server-side automatically — no polling, no stale ghosts.
 */
export function usePresence(): PresenceState {
  const [web, setWeb] = useState<number | null>(null);
  const [app, setApp] = useState<number | null>(null);

  useEffect(() => {
    const db = getDb();
    if (!db) return;

    // 1. Register THIS visitor under /presence/web/<auto-id>
    const myRef = push(ref(db, 'presence/web'));
    set(myRef, { ts: serverTimestamp() }).catch(() => {});
    // When this client disconnects (closes tab, loses network), wipe the entry.
    onDisconnect(myRef).remove();

    // 2. Subscribe to live counts of both categories
    const webRef = ref(db, 'presence/web');
    const appRef = ref(db, 'presence/app');

    const unsubWeb = onValue(webRef, (snap) => {
      setWeb(snap.size); // number of direct children
    });
    const unsubApp = onValue(appRef, (snap) => {
      setApp(snap.size);
    });

    // Defensive cleanup if the component unmounts (e.g. in dev w/ HMR)
    return () => {
      unsubWeb();
      unsubApp();
      remove(myRef).catch(() => {});
    };
  }, []);

  return { web, app };
}
