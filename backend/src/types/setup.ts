export type GearCategory = 'Keyboard' | 'Mouse' | 'Monitor' | 'Headset' | 'Chair' | 'Desk' | 'PC/Laptop' | 'Other';
export type WorkModality = 'Remote' | 'Hybrid' | 'Office';

export interface IGearItem {
  category: GearCategory;
  name: string;
  brand?: string;
  model?: string;
  link?: string;
  details?: string;
}

export interface ISetup {
  user: string; 
  title: string;
  description?: string;
  workRole: string;
  workModality: WorkModality;
  thumbnail: string;
  gears: IGearItem[];
  softwareStack: string[];
  tags: string[];
  likes: string[];
}