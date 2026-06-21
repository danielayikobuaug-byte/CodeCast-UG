'use server';
/**
 * @fileOverview This file implements a Genkit flow for automatically identifying and merging multiple reports describing the same real-world event.
 *
 * - autoMergeDuplicateReports - A function that handles the merging of duplicate event reports.
 * - AutoMergeDuplicateReportsInput - The input type for the autoMergeDuplicateReports function.
 * - AutoMergeDuplicateReportsOutput - The return type for the autoMergeDuplicateReports function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema
const AutoMergeDuplicateReportsInputSchema = z.object({
  reports: z.array(z.object({
    id: z.string().describe('Unique identifier for the report.'),
    description: z.string().describe('The textual description of the report.'),
    type: z.enum(['Emergency', 'Traffic', 'Power outage', 'Event', 'Flood', 'Crime', 'Fuel shortage', 'Public services']).describe('The type of event reported.'),
    latitude: z.number().describe('The latitude of the report location.'),
    longitude: z.number().describe('The longitude of the report location.'),
    timestamp: z.string().datetime().describe('ISO 8601 timestamp of when the report was created.').refine((s) => !isNaN(new Date(s).getTime()), 'Invalid ISO 8601 timestamp string.'),
  })).describe('An array of raw reports to be evaluated for merging.'),
});
export type AutoMergeDuplicateReportsInput = z.infer<typeof AutoMergeDuplicateReportsInputSchema>;

// Output Schema
const AutoMergeDuplicateReportsOutputSchema = z.object({
  mergedReports: z.array(z.object({
    masterReportId: z.string().describe('The ID of the primary report chosen for this merged group.'),
    mergedReportIds: z.array(z.string()).describe('An array of IDs of reports that were merged into this group, including the masterReportId.'),
    summary: z.string().describe('A consolidated summary of the event described by the merged reports.'),
  })).describe('An array of merged report groups.'),
  unmergedReports: z.array(z.string()).describe('An array of IDs of reports that could not be merged into any group.'),
});
export type AutoMergeDuplicateReportsOutput = z.infer<typeof AutoMergeDuplicateReportsOutputSchema>;

const autoMergePrompt = ai.definePrompt({
  name: 'autoMergeDuplicateReportsPrompt',
  input: { schema: AutoMergeDuplicateReportsInputSchema.extend({
    reportsJsonString: z.string().describe('JSON string representation of the reports array for the prompt template.').optional(),
  })},
  output: { schema: AutoMergeDuplicateReportsOutputSchema },
  prompt: `You are an intelligent system designed to identify and merge duplicate reports about real-world events.
Your goal is to reduce clutter and consolidate information by grouping reports that describe the same incident.

Carefully analyze the provided reports. For each report, consider its description, type, location (latitude and longitude), and timestamp.
Two reports should be considered duplicates if they describe the same event, meaning:
1. Their descriptions are semantically very similar.
2. They are of the same 'type'.
3. Their locations are geographically close (within a small radius, e.g., a few hundred meters).
4. Their timestamps are close in time (within a reasonable time window, e.g., 30 minutes to 1 hour, indicating a concurrent event).

For each group of duplicate reports you identify, create a merged report entry.
- Choose one report from the group as the 'masterReportId'. This should ideally be the most comprehensive or earliest report chronologically.
- List all report IDs that belong to this merged group in 'mergedReportIds'.
- Provide a concise 'summary' of the event described by the merged reports, combining key details from all reports in the group.

Reports that do not have any duplicates or cannot be confidently merged into any group should be listed in the 'unmergedReports' array by their IDs.

Strictly adhere to the output JSON format described in the schema.

Reports to analyze:
{{reportsJsonString}}`,
});

const autoMergeDuplicateReportsFlow = ai.defineFlow(
  {
    name: 'autoMergeDuplicateReportsFlow',
    inputSchema: AutoMergeDuplicateReportsInputSchema,
    outputSchema: AutoMergeDuplicateReportsOutputSchema,
  },
  async (input) => {
    // Stringify reports for the prompt, as direct JSON.stringify is not supported in Handlebars.
    const processedInput = {
      ...input,
      reportsJsonString: JSON.stringify(input.reports, null, 2), // Prettify for better LLM parsing
    };

    const { output } = await autoMergePrompt(processedInput);
    if (!output) {
      throw new Error('Failed to generate merged reports.');
    }
    return output;
  }
);

export async function autoMergeDuplicateReports(input: AutoMergeDuplicateReportsInput): Promise<AutoMergeDuplicateReportsOutput> {
  return autoMergeDuplicateReportsFlow(input);
}
