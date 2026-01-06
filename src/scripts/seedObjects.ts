import { Genre } from "../types/genre";

export const seedUsers = [
  {
    id: "user_1",
    username: "alice",
    preferences: {
      favoriteGenres: ["Drama", "SciFi"],
      dislikedGenres: ["Horror"],
    },
    watchHistory: [],
  },
];

export const seedMovies = [
  {
    id: "movie_1",
    title: "Inception",
    description: "Dream within a dream",
    genres: ["SciFi"] as Genre[],
    releaseDate: new Date("2010-07-16"),
    director: "Christopher Nolan",
    actors: ["Leonardo DiCaprio"],
  },
];

export const seedTVShows = [
  {
    id: "tv_1",
    title: "Breaking Bad",
    description: "Chemistry teacher turns outlaw",
    genres: ["Drama"] as Genre[],
    episodes: [
      {
        episodeNumber: 1,
        seasonNumber: 1,
        releaseDate: new Date("2008-01-20"),
        director: "Vince Gilligan",
        actors: ["Bryan Cranston"],
      },
    ],
  },
];
