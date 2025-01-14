import { MovieType, StreamingCountry } from "../types";

export async function fetchMovies(query: string) {
  if (!query) return [];
  try {
    const res = await fetch(
      `${process.env.TMDB_BASE_URL}/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}`,
    );
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

export async function fetchMovie(id: string): Promise<MovieType | null> {
  if (!id) return null;

  try {
    const res = await fetch(
      `${process.env.TMDB_BASE_URL}/movie/${id}?append_to_response=credits`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch movie details");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching movie:", error);
    return null;
  }
}

export async function fetchStreamingServices(
  id: string,
): Promise<StreamingCountry | null> {
  if (!id) return null;

  try {
    const res = await fetch(
      `${process.env.TMDB_BASE_URL}/movie/${id}/watch/providers?language=en-US`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch streaming providers");
    }

    const data = await res.json();
    return data.results["US"] || [];
  } catch (error) {
    console.error("Error fetching streaming providers:", error);
    return null;
  }
}
