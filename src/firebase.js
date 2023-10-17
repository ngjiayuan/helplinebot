// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import 'dotenv/config';
import { REGISTER_STATE } from './constant.js';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'helplinebot-71d02.firebaseapp.com',
  databaseURL: 'https://helplinebot-71d02-default-rtdb.firebaseio.com',
  projectId: 'helplinebot-71d02',
  storageBucket: 'helplinebot-71d02.appspot.com',
  messagingSenderId: '495530564580',
  appId: '1:495530564580:web:c994d70516b0bc85f2c5f1',
  measurementId: 'G-BVNB4TT8BQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getUserById(id) {
  try {
    const docRef = doc(db, 'user', `${id}`);
    const docData = (await getDoc(docRef)).data();
    return docData; // undefined if no such user
  } catch (e) {
    throw new Error(`error fetching user`);
  }
}

export async function addUser(user) {
  try {
    await setDoc(doc(db, 'user', `${user.id}`), {
      name: user.name,
      username: user.username,
      role: 'user',
      isBlocked: false,
      isConnected: true,
      isRegistered: REGISTER_STATE.REGISTERING,
    });
  } catch (e) {
    throw new Error(`error adding user`);
  }
}

export async function isAdmin(id) {
  try {
    const docRef = doc(db, 'user', `${id}`);
    const docData = (await getDoc(docRef)).data();
    if (docData) {
      return docData.role === 'admin';
    }
    return false; // undefined if no such user
  } catch (e) {
    throw new Error(`error fetching user`);
  }
}

export async function isVolunteer(id) {
  try {
    const docRef = doc(db, 'user', `${id}`);
    const docData = (await getDoc(docRef)).data();
    if (docData) {
      return docData.role === 'volunteer';
    }
    return false; // undefined if no such user
  } catch (e) {
    throw new Error(`error fetching user`);
  }
}

export async function isRegistered(id) {
  try {
    const docRef = doc(db, 'user', `${id}`);
    const docData = (await getDoc(docRef)).data();
    if (docData) {
      return docData.isRegistered;
    }
    return false; // undefined if no such user
  } catch (e) {
    throw new Error(`error fetching user`);
  }
}

export async function isBlocked(id) {
  try {
    const docRef = doc(db, 'user', `${id}`);
    const docData = (await getDoc(docRef)).data();
    if (docData) {
      return docData.isBlocked;
    }
    return false; // undefined if no such user
  } catch (e) {
    throw new Error(`error fetching user`);
  }
}

export async function isConnected(id) {
  try {
    const docRef = doc(db, 'user', `${id}`);
    const docData = (await getDoc(docRef)).data();
    if (docData) {
      return docData.isConnected;
    }
    return false; // undefined if no such user
  } catch (e) {
    throw new Error(`error fetching user`);
  }
}

export async function addVolunteer(id) {
  try {
    const docRef = doc(db, 'user', `${id}`);
    const user = (await getDoc(docRef)).data();
    if (!user) {
      return false;
    }
    await setDoc(doc(db, 'user', `${id}`), {
      name: user.name,
      username: user.username,
      role: 'volunteer',
      isBlocked: false,
      isConnected: user.isConnected,
      isRegistered: user.isRegistered,
    });
    return true;
  } catch (e) {
    throw new Error(`error adding volunteer`);
  }
}

export async function removeVolunteer(id) {
  try {
    const docRef = doc(db, 'user', `${id}`);
    const user = (await getDoc(docRef)).data();
    if (!user) {
      return false;
    }
    await setDoc(doc(db, 'user', `${id}`), {
      name: user.name,
      username: user.username,
      role: 'user',
      isBlocked: false,
      isConnected: user.isConnected,
      isRegistered: user.isRegistered,
    });
    return true;
  } catch (e) {
    throw new Error(`error removing volunteer`);
  }
}

export async function blockUser(id) {
  try {
    const docRef = doc(db, 'user', `${id}`);
    const user = (await getDoc(docRef)).data();
    if (!user) {
      return false;
    }
    await setDoc(doc(db, 'user', `${id}`), {
      name: user.name,
      username: user.username,
      role: 'user',
      isBlocked: true,
      isConnected: user.isConnected,
      isRegistered: user.isRegistered,
    });
    return true;
  } catch (e) {
    throw new Error(`error blocking user`);
  }
}

export async function unblockUser(id) {
  try {
    const docRef = doc(db, 'user', `${id}`);
    const user = (await getDoc(docRef)).data();
    if (!user) {
      return false;
    }
    await setDoc(doc(db, 'user', `${id}`), {
      name: user.name,
      username: user.username,
      role: 'user',
      isBlocked: false,
      isConnected: user.isConnected,
      isRegistered: user.isRegistered,
    });
    return true;
  } catch (e) {
    throw new Error(`error unblocking user`);
  }
}

export async function disconnectUser(id) {
  try {
    const docRef = doc(db, 'user', `${id}`);
    const user = (await getDoc(docRef)).data();
    if (!user) {
      return false;
    }
    await setDoc(doc(db, 'user', `${id}`), {
      name: user.name,
      username: user.username,
      role: 'user',
      isBlocked: user.isBlocked,
      isConnected: false,
      isRegistered: user.isRegistered,
    });
    return true;
  } catch (e) {
    throw new Error(`error disconnecting user`);
  }
}

export async function connectUser(id) {
  try {
    const docRef = doc(db, 'user', `${id}`);
    const user = (await getDoc(docRef)).data();
    if (!user) {
      return false;
    }
    await setDoc(doc(db, 'user', `${id}`), {
      name: user.name,
      username: user.username,
      role: user.role,
      isBlocked: user.isBlocked,
      isConnected: true,
      isRegistered: user.isRegistered,
    });
    return true;
  } catch (e) {
    throw new Error(`error connecting user`);
  }
}
