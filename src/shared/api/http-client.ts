const API_BASE_URL = 'https://rickandmortyapi.com/api';

export class HttpRequestError extends Error {
  constructor(readonly status: number) {
    super(`Request failed with status ${status}`);
    this.name = 'HttpRequestError';
  }
}

function buildApiUrl(path: string) {
  if (path.startsWith('/')) {
    return `${API_BASE_URL}${path}`;
  }

  return `${API_BASE_URL}/${path}`;
}

// Centralizes the base URL and the basic HTTP validation for future requests.
export async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(buildApiUrl(path), {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new HttpRequestError(response.status);
  }

  return response.json() as Promise<T>;
}
