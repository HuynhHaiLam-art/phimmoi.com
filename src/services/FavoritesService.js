class FavoritesService {
    constructor() {
        this.observers = [];
        this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    }

    subscribe(observer) {
        this.observers.push(observer);
        return () => {
            this.observers = this.observers.filter(obs => obs !== observer);
        };
    }

    notify() {
        this.observers.forEach(observer => observer(this.favorites));
    }

    addFavorite(movie) {
        if (!this.favorites.find(f => f.id === movie.id)) {
            this.favorites.push(movie);
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
            this.notify();
        }
    }

    removeFavorite(movieId) {
        this.favorites = this.favorites.filter(f => f.id !== movieId);
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        this.notify();
    }

    getFavorites() {
        return this.favorites;
    }
}

export const favoritesService = new FavoritesService();