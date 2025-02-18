export interface CrewMember {
  department: string;
  id: number;
  job: string;
  name: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieType {
  credits: {
    crew: CrewMember[];
  };
  genres: Genre[];
  id: number;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  runtime: number;
  release_date: string;
  title: string;
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
export interface StreamingCountry {
  link: string;
  buy: StreamingServiceItem[];
  flatrate: StreamingServiceItem[];
  rent: StreamingServiceItem[];
}

// export interface StreamingServiceType {
//   id: number;
//   results: StreamingCountry[];
// }
