import axios from 'axios';

const API_KEY = 'f62ebba5';
const BASE_URL = 'https://www.omdbapi.com/';

// Criando instância do axios com configurações padrão
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
  timeout: 10000, // timeout após 10 segundos
});

// Interceptor para tratamento global de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Erro do servidor
      throw new Error('Erro no servidor. Tente novamente mais tarde.');
    } else if (error.request) {
      // Erro de rede
      throw new Error('Erro de conexão. Verifique sua internet.');
    }
    // Outros erros
    throw error;
  }
);

/**
 * Busca filmes pelo termo de pesquisa
 * @param {string} searchTerm - Termo para busca de filmes
 * @returns {Promise<Array>} Lista de filmes encontrados
 */
export const searchMovies = async (searchTerm) => {
  try {
    const response = await api.get('', {
      params: {
        s: searchTerm,
        type: 'movie',
      },
    });

    if (response.data.Response === 'True') {
      return response.data.Search;
    }
    
    throw new Error(response.data.Error || 'Nenhum filme encontrado');
  } catch (error) {
    throw error;
  }
};

/**
 * Busca detalhes de um filme específico
 * @param {string} movieId - ID do filme no IMDB
 * @returns {Promise<Object>} Detalhes do filme
 */
export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get('', {
      params: {
        i: movieId,
        plot: 'full',
      },
    });

    if (response.data.Response === 'True') {
      return response.data;
    }
    
    throw new Error(response.data.Error || 'Detalhes do filme não encontrados');
  } catch (error) {
    throw error;
  }
}
