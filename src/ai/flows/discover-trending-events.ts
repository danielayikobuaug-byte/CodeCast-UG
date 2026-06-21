'use server';
/**
 * @fileOverview A Genkit flow to discover trending events from a list of reports.
 *
 * - discoverTrendingEvents - A function that handles the process of identifying trending topics.
 * - DiscoverTrendingEventsInput - The input type for the discoverTrendingEvents function.
 * - DiscoverTrendingEventsOutput - The return type for the discoverTrendingEvents function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiscoverTrendingEventsInputSchema = z
  .array(z.string())
  .describe('A list of recent city event reports.');
export type DiscoverTrendingEventsInput = z.infer<
  typeof DiscoverTrendingEventsInputSchema
>;

const DiscoverTrendingEventsOutputSchema = z
  .array(z.string())
  .describe('A list of trending topics or events identified from the reports.');
export type DiscoverTrendingEventsOutput = z.infer<
  typeof DiscoverTrendingEventsOutputSchema
>;

export async function discoverTrendingEvents(
  input: DiscoverTrendingEventsInput
): Promise<DiscoverTrendingEventsOutput> {
  return discoverTrendingEventsFlow(input);
}

const discoverTrendingEventsPrompt = ai.definePrompt({
  name: 'discoverTrendingEventsPrompt',
  input: {schema: DiscoverTrendingEventsInputSchema},
  output: {schema: DiscoverTrendingEventsOutputSchema},
  prompt: `You are an AI assistant specialized in identifying trending topics from city reports.
Your goal is to analyze a list of individual reports and extract the most significant and frequently mentioned events, locations, or themes that appear to be currently trending.
Consider synonyms and related concepts when identifying trends.
The output should be a concise list of trending topics, each as a separate string.

Here are the reports:
{{#each this}}
- {{{this}}}
{{/each}}`,
});

const discoverTrendingEventsFlow = ai.defineFlow(
  {
    name: 'discoverTrendingEventsFlow',
    inputSchema: DiscoverTrendingEventsInputSchema,
    outputSchema: DiscoverTrendingEventsOutputSchema,
  },
  async input => {
    const {output} = await discoverTrendingEventsPrompt(input);
    if (!output) {
      throw new Error('Failed to identify trending events.');
    }
    return output;
  }
);
