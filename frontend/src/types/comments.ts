import { IPopulatedUser } from './user';

export interface IComment {
  _id: string;
  user: IPopulatedUser; 
  setup: string; 
  content: string;
  createdAt: string;
  updatedAt: string;
}