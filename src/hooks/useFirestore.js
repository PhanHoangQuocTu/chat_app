import { useEffect, useState } from "react"
import { onSnapshot, collection, query, orderBy, where } from "firebase/firestore";
import { db } from "../firebase/config";

const useFirestore = (collectionInit, condition) => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        let collectionRef = query(collection(db, collectionInit), orderBy('createdAt'));

        //condition
        /**
         * {
         *  fieldName: 'abc',
         *  operator: '==' or 'in',
         *  value: ['abc', 'def'] or 'abc'
         * }
         */
        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                return;
            }

            var q = query(collectionRef, where(condition.fieldName, condition.operator, condition.compareValue))
        }

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const documents = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setDocuments(documents);
        })

        return unsubscribe;
    }, [collectionInit, condition])

    return documents;
}

export default useFirestore;