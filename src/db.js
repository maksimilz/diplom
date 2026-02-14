import { db } from './firebase';
import {
    collection,
    doc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';

/**
 * Получить все документы из коллекции пользователя
 * Коллекция: users/{userId}/{collectionName}
 */
export async function getUserCollection(userId, collectionName) {
    const ref = collection(db, 'users', userId, collectionName);
    const q = query(ref, orderBy('createdAt', 'desc'));
    try {
        const snap = await getDocs(q);
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) {
        // Если коллекция пуста или ещё нет индекса — просто без orderBy
        const snap = await getDocs(collection(db, 'users', userId, collectionName));
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    }
}

/**
 * Добавить документ в коллекцию пользователя
 */
export async function addToUserCollection(userId, collectionName, data) {
    const ref = collection(db, 'users', userId, collectionName);
    const docRef = await addDoc(ref, {
        ...data,
        createdAt: serverTimestamp()
    });
    return docRef.id;
}

/**
 * Обновить документ в коллекции пользователя
 */
export async function updateInUserCollection(userId, collectionName, docId, data) {
    const ref = doc(db, 'users', userId, collectionName, docId);
    await updateDoc(ref, data);
}

/**
 * Удалить документ из коллекции пользователя
 */
export async function deleteFromUserCollection(userId, collectionName, docId) {
    const ref = doc(db, 'users', userId, collectionName, docId);
    await deleteDoc(ref);
}

/**
 * Добавить документ в корневую (глобальную) коллекцию
 */
export async function addToGlobalCollection(collectionName, data) {
    const ref = collection(db, collectionName);
    const docRef = await addDoc(ref, {
        ...data,
        createdAt: serverTimestamp()
    });
    return docRef.id;
}

