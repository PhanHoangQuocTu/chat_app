import { db } from './config'
import { serverTimestamp, doc, setDoc } from 'firebase/firestore';
export const addDocument = async (collectionName, data, id) => {
    await setDoc(doc(db, collectionName, id), {
        ...data,
        createAt: serverTimestamp()
    });
}