import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.TMDB_BEARER_TOKEN;

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

export async function checkAuthentication() {
  try {
    const response = await tmdbApi.get("/authentication");
    console.log("Autenticação bem-sucedida:", response.data);
    return response.data;
  } catch (error: any) {
    // O Axios lida com erros HTTP jogando uma exceção (catch)
    console.error(
      "Erro na autenticação:",
      error.response?.data || error.message,
    );
    throw error;
  }
}

export async function getPopularMovies(
  language: string = "pt-BR",
  page: number = 1,
) {
  try {
    const response = await tmdbApi.get("/movie/popular", {
      params: {
        language,
        page,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Erro ao buscar filmes:",
      error.response?.data || error.message,
    );
    throw error;
  }
}

export async function getMovieById(movieId: number | string) {
  try {
    // Faz a requisição injetando o ID na URL e adicionando o idioma como parâmetro
    const response = await tmdbApi.get(`/movie/${movieId}`, {
      params: {
        language: "pt-BR",
      },
    });

    console.log("Filme encontrado:", response.data.title);
    return response.data;
  } catch (error: any) {
    console.error(
      `Erro ao buscar o filme ${movieId}:`,
      error.response?.data || error.message,
    );
    throw error;
  }
}

export async function getMovieGenres(language: string = "pt-BR") {
  try {
    const response = await tmdbApi.get("/genre/movie/list", {
      params: {
        language,
      },
    });
    return response.data.genres; // Retorna um array de objetos: [{ id: 28, name: "Ação" }, ...]
  } catch (error: any) {
    console.error(
      "Erro ao buscar a lista de gêneros:",
      error.response?.data || error.message,
    );
    throw error;
  }
}

export async function getMoviesNowPlaying(language: string = "pt-BR") {
  try {
    const response = await tmdbApi.get("/movie/now_playing", {
      params: {
        language,
      },
    });
    return response.data.genres; // Retorna um array de objetos: [{ id: 28, name: "Ação" }, ...]
  } catch (error: any) {
    console.error(
      "Erro ao buscar a lista de gêneros:",
      error.response?.data || error.message,
    );
    throw error;
  }
}
