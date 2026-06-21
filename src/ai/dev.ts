import { config } from 'dotenv';
config();

import '@/ai/flows/flag-suspicious-reports.ts';
import '@/ai/flows/discover-trending-events.ts';
import '@/ai/flows/auto-merge-duplicate-reports.ts';