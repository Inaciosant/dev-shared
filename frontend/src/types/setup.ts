import { IPopulatedUser } from './user';

export type GearCategory = 'Keyboard' | 'Mouse' | 'Monitor' | 'Headset' | 'Chair' | 'Desk' | 'PC/Laptop' | 'Other';
export type WorkModality = 'Remote' | 'Hybrid' | 'Office';

export interface IGearItem {
  _id?: string; 
  category: GearCategory;
  name: string;
  brand?: string;
  model?: string;
  link?: string;
  details?: string;
}

export interface ISetup {
  _id: string;
  user: IPopulatedUser | string; 
  title: string;
  description?: string;
  workRole: string;
  workModality: WorkModality;
  thumbnail: string;
  images?: string[];
  gears: IGearItem[];
  softwareStack: string[];
  tags: string[];
  likes: string[]; 
  createdAt: string;
  updatedAt: string;
}