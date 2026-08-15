import { PulseReport } from './types';

export const INITIAL_REPORTS: PulseReport[] = [
  {
    id: '1',
    type: 'Traffic',
    description: 'Heavy gridlock at Nakawa Spear Motors junction. Avoid if possible.',
    latitude: 0.3341,
    longitude: 32.6074,
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    userId: 'u1',
    userName: 'Kato S.',
    confirmations: 12,
    denials: 0,
    isVerified: true
  },
  {
    id: '2',
    type: 'Power outage',
    description: 'Sudden blackout in Naalya Housing Estate. Anyone else?',
    latitude: 0.3541,
    longitude: 32.6374,
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    userId: 'u2',
    userName: 'Sarah M.',
    confirmations: 45,
    denials: 1,
    isVerified: true
  },
  {
    id: '3',
    type: 'Emergency',
    description: 'Fire incident near Acacia Mall. Fire trucks arriving.',
    latitude: 0.3331,
    longitude: 32.5874,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    userId: 'u3',
    userName: 'Brenda L.',
    confirmations: 8,
    denials: 0,
    isVerified: false
  },
  {
    id: '4',
    type: 'Event',
    description: 'Arsenal vs Man City screening happening now at Legends Bar.',
    latitude: 0.3241,
    longitude: 32.5974,
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    userId: 'u4',
    userName: 'Sam O.',
    confirmations: 20,
    denials: 0,
    isVerified: true,
    photoUrl: 'https://i.pinimg.com/736x/d3/52/57/d352573864c1a7bd725ba623580702e6.jpg'
  }
];