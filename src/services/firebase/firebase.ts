import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  User,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  CollectionReference,
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firebaseConfig } from "./config";

export type TMessage = {
  content?: string;
  createdAt?: unknown;
  displayName?: string;
  id: number | string;
  photoURL?: string;
};


initializeApp(firebaseConfig);

const auth = getAuth();

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((data) =>
      setUser(data)
    );

    return unsubscribe
  });

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  return { user, signInWithGoogle, logOut };
};

export const useOptionalUser = () => useAuth()
export const useLoggedUser = () => {
  const { user, ...rest } = useAuth()

  if (!user) {
    throw new Error('User is not logged in')
  }

  return { user, ...rest }
}

export const useChat = () => {
  const firestore = getFirestore();
  const [messages, setMessages] = useState<TMessage[] | null>(null);

  const messagesCollection = collection(firestore, "messages") as CollectionReference<TMessage>
  const messagesQuery = query(messagesCollection, orderBy("createdAt", "desc"));

  useEffect(() => {
    const unsubscribe = onSnapshot(messagesQuery, (doc) => {
      const messages = doc.docs.map(doc => doc.data()).reverse()

      setMessages(messages);
    });
    return unsubscribe
  }, [messagesQuery]);

  const { user } = useAuth();

  const addMessage = (content: string) => {
    addDoc(collection(firestore, "messages"), {
      displayName: user?.displayName,
      content,
      photoURL: user?.photoURL,
      createdAt: serverTimestamp(),
      id: crypto.randomUUID(),
    });
  };

  return { addMessage, messages };
};
