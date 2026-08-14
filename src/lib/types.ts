export type ServiceCategory = 'Software' | 'Entertainment' | 'Connectivity';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: string;
  description: string;
  icon: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  client: string;
}