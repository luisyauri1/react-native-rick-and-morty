import { getJson } from './http-client';

describe('getJson', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('calls fetch with the full api url', async () => {
    // Arrange
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });

    globalThis.fetch = fetchMock as typeof fetch;

    // Act
    await getJson('/character');

    // Assert
    expect(fetchMock).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character',
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
  });

  test('returns the parsed json when the request succeeds', async () => {
    // Arrange
    const mockedResponse = { results: [{ id: 1, name: 'Rick Sanchez' }] };

    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockedResponse),
    }) as typeof fetch;

    // Act
    const result = await getJson<typeof mockedResponse>('/character');

    // Assert
    expect(result).toEqual(mockedResponse);
  });

  test('throws an error when the response is not ok', async () => {
    // Arrange
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: jest.fn(),
    }) as typeof fetch;

    // Act
    const request = getJson('/character/99999');

    // Assert
    await expect(request).rejects.toThrow('Request failed with status 404');
  });
});
