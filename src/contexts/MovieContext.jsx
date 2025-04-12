import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from './AuthContext';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';

const MovieContext = createContext();

export function useMovieContext() {
    return useContext(MovieContext);
}

export function MovieProvider({ children }) {
    const [favorites, setFavorites] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        const loadFavorites = async () => {
            if (currentUser) {
                const docRef = doc(db, 'users', currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setFavorites(docSnap.data().favorites || []);
                }
            } else {
                setFavorites([]);
            }
        };

        loadFavorites();
    }, [currentUser]);

    const addToFavorites = async (movie) => {
        try {
            if (currentUser) {
                const userRef = doc(db, 'users', currentUser.uid);
                await updateDoc(userRef, {
                    favorites: arrayUnion(movie)
                });
                setFavorites([...favorites, movie]);
            }
        } catch (error) {
            console.error("Error adding to favorites:", error);
        }
    };

    const removeFromFavorites = async (movie) => {
        try {
            if (currentUser) {
                const userRef = doc(db, 'users', currentUser.uid);
                await updateDoc(userRef, {
                    favorites: arrayRemove(movie)
                });
                setFavorites(favorites.filter(m => m.id !== movie.id));
            }
        } catch (error) {
            console.error("Error removing from favorites:", error);
        }
    };

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite: (movieId) => favorites.some(m => m.id === movieId)
    };

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
}