export interface CrewMember {
  department: string;
  id: number;
  job: string;
  name: string;
}

export interface TrailerType {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieType {
  credits?: {
    crew: CrewMember[];
  };
  videos?: { results: TrailerType[] };
  genres: Genre[];
  id: number;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  runtime: number;
  vote_average: number;
  release_date: string;
  title: string;
  // Temporary properties for filtering
  streaming_services?: StreamingServiceItem[];
}

export interface StreamingServiceItem {
  source_id: number;
  name: string;
  type: "free" | "sub" | "rent" | "buy";
  region: string;
  ios_url: string | null;
  android_url: string | null;
  web_url: string;
  format: string | null;
  price: number | null;
  seasons: number;
  episodes: number;
}

export interface StreamingDataError {
  success: boolean;
}
export interface StreamingCountry {
  link: string;
  buy: StreamingServiceItem[];
  flatrate: StreamingServiceItem[];
  rent: StreamingServiceItem[];
}
