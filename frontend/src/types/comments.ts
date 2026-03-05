import { IPopulatedUser } from './user';

export interface IComment {
  _id: string;
  user: IPopulatedUser; 
  setup: string; 
  parentComment?: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
}