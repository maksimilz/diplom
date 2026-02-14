import { auth } from './firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';

/**
 * Регистрация нового пользователя
 */
export async function registerUser(email, password, displayName) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
        await updateProfile(cred.user, { displayName });
    }
    return cred.user;
}

/**
 * Вход пользователя
 */
export async function loginUser(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
}

/**
 * Выход пользователя
 */
export async function logoutUser() {
    await signOut(auth);
}

/**
 * Подписка на изменение состояния аутентификации
 */
export function onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
}
