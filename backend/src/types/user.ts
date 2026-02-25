export interface IUser {
  id?: string; 
  name: string;
  email: string;
  password?: string; 
  avatar?: string;
  bio?: string;
  githubUrl?: string;
  favorites?: string[]; 
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserPublicProfile = Pick<IUser, 'id' | 'name' | 'avatar'>;