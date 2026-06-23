const API_KEY: string = '4f19e6d9';

const searchInput = document.getElementById('searchInput') as HTMLInputElement;
const emptyInfoDiv = document.getElementById('emptyInfo') as HTMLDivElement;
const errorDiv = document.getElementById('error') as HTMLDivElement;
const loadingDiv = document.getElementById('loading') as HTMLDivElement;
const resultContainer = document.getElementById('resultContainer') as HTMLDivElement;

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  Type: string;
}

interface OmdbSearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: 'True' | 'False';
  Error?: string;
}

searchInput.addEventListener('input', searchTypeHandler);

async function searchTypeHandler(event: Event): Promise<void> {
  setDisplayEmpty(false);
  setDisplayError(false);

  const value = ((event.target as HTMLInputElement).value || '').trim();

  if (!value || value.length < 3) {
    setDisplayEmpty(true);
    return;
  }

  const movies = await searchMovies(value);

  if (movies.length === 0) {
    setDisplayResults(false);
    return;
  }

  showMovies(movies);
}

function showMovies(movies: Movie[]): void {
  let htmlToInsert: string = '';

  const moviesToShow: Movie[] = movies.toSorted(
    (a: Movie, b: Movie) => Number(a.Year) - Number(b.Year)
  );

  moviesToShow.forEach((movie: Movie) => {
    htmlToInsert += `
    <div class="movie">
      <div>${movie.Title} (${movie.Year})</div>
      <img src="${movie.Poster}" alt="Movie poster">
    </div>
    `;
  });

  resultContainer.innerHTML = htmlToInsert;
  setDisplayResults(true);
}

async function searchMovies(query: string): Promise<Movie[]> {
  setDisplayLoading(true);

  let movies: Movie[] = [];

  try {
    const url: string = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;
    const response: Response = await fetch(url);
    const moviesData: OmdbSearchResponse = await response.json();

    if (moviesData.Response === 'False') {
      throw new Error(moviesData.Error);
    }

    movies = moviesData.Search;
  } catch (error) {
    errorDiv.innerText = (error as Error).message;
    setDisplayError(true);
  } finally {
    setDisplayLoading(false);
  }

  return movies;
}

function setDisplayResults(isShown: boolean): void {
  resultContainer.classList.toggle('hidden', !isShown);
}

function setDisplayLoading(isShown: boolean): void {
  loadingDiv.classList.toggle('hidden', !isShown);
}

function setDisplayError(isShown: boolean): void {
  errorDiv.classList.toggle('hidden', !isShown);
}

function setDisplayEmpty(isShown: boolean): void {
  emptyInfoDiv.classList.toggle('hidden', !isShown);
}