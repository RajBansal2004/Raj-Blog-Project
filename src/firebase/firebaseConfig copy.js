import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD6aw77LJLJpWarE3PasuT9JJK7pev5cDs",
  authDomain: "writer-1e82e.firebaseapp.com",
  databaseURL: "https://writer-1e82e-default-rtdb.firebaseio.com",
  projectId: "writer-1e82e",
  storageBucket: "writer-1e82e.firebasestorage.app",
  messagingSenderId: "798962855297",
  appId: "1:798962855297:web:72a9a66f4d8eb4e6e7cc80",
  measurementId: "G-64E3LECF08"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


const addBlogToFirestore = async (blog) => {
  try {
    const docRef = await addDoc(collection(db, "blogs"), blog);
    console.log("Blog added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding blog: ", e);
  }
};

const getBlogsFromFirestore = async () => {
  const querySnapshot = await getDocs(collection(db, "blogs"));
  const blogs = [];
  querySnapshot.forEach((doc) => {
    blogs.push(doc.data());
  });
  return blogs;
};
 
export { addBlogToFirestore, getBlogsFromFirestore };
