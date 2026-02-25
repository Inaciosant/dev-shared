export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  githubUrl?: string;
  favorites?: string[]; 
  createdAt: string;
  updatedAt: string;
}

export type IPopulatedUser = Pick<IUser, '_id' | 'name' | 'avatar'> & {
  workRole?: string;
};