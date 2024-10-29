const API_KEY = '3da61da73764d907c9797c8a3317d624';
const API_BASE = 'https://api.themoviedb.org/3';

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
};

export default {
    getHomeList: async () => {
        // Corrigindo o uso correto de template literals e variáveis de forma adequada
        const originals = await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`);
        const trending = await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`);
        const toprated = await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`);
        const action = await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`);
        const comedy = await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`);
        const horror = await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`);
        const romance = await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`);
        const documentary = await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`);

        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: originals
            },
            {
                slug: 'trending',
                title: 'Recomendados para Você',
                items: trending
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: toprated
            },
            {
                slug: 'action',
                title: 'Ação',
                items: action
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: comedy
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: horror
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: romance
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                items: documentary
            },
        ];
    },

     getMovieInfo: async (movieId, type) => {
        let info = {};
    
        if (movieId) {
            switch (type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                    break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                    break;
                default:
                    info = null;
                    break;
            }
        }
    
        return info;
    }
    
}


