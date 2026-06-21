export type EventType = 
  | 'Emergency' 
  | 'Traffic' 
  | 'Power outage' 
  | 'Event' 
  | 'Flood' 
  | 'Crime' 
  | 'Fuel shortage' 
  | 'Public services';

export interface PulseReport {
  id: string;
  type: EventType;
  description: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  photoUrl?: string;
  confirmations: number;
  denials: number;
  isVerified: boolean;
  isSuspicious?: boolean;
  suspicionReason?: string;
}

export interface TrendingTopic {
  id: string;
  title: string;
  count: number;
  category: EventType;
}