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
  runtime: number;
  release_date: string;
  title: string;
}

export interface StreamingServiceItem {
  display_priority: number;
  provider_id: number;
  provider_name: string;
  logo_path: string;
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
