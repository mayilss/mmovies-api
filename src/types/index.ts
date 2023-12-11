export interface IUser {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface IDirector {
  firstname: string;
  lastname: string;
  birthyear?: string;
  bio?: string;
  movieIds?: string[];
}
