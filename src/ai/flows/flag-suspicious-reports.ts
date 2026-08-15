'use server';
/**
 * @fileOverview A Genkit flow for flagging suspicious user reports.
 *
 * - flagSuspiciousReports - A function that analyzes user reports for suspicious content.
 * - FlagSuspiciousReportsInput - The input type for the flagSuspiciousReports function.
 * - FlagSuspiciousReportsOutput - The return type for the flagSuspiciousReports function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const FlagSuspiciousReportsInputSchema = z.object({
  reportContent: z.string().describe('The textual content of the user report to analyze.'),
  reportCategory: z.string().optional().describe('The category of the reported event, e.g., "Traffic", "Crime", "Emergency".'),
});
export type FlagSuspiciousReportsInput = z.infer<typeof FlagSuspiciousReportsInputSchema>;

const FlagSuspiciousReportsOutputSchema = z.object({
  isSuspicious: z.boolean().describe('True if the report indicates potentially false information or a dangerous incident.'),
  suspicionReason: z.string().describe('A detailed explanation of why the report is considered suspicious, or "None" if it is not suspicious.'),
  recommendedAction: z.enum(['review_immediately', 'monitor', 'clear']).describe('The recommended action for a human moderator: "review_immediately" for high suspicion/danger, "monitor" for moderate suspicion, or "clear" if no issues are found.'),
});
export type FlagSuspiciousReportsOutput = z.infer<typeof FlagSuspiciousReportsOutputSchema>;

export async function flagSuspiciousReports(input: FlagSuspiciousReportsInput): Promise<FlagSuspiciousReportsOutput> {
  return flagSuspiciousReportsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'flagSuspiciousReportsPrompt',
  input: { schema: FlagSuspiciousReportsInputSchema },
  output: { schema: FlagSuspiciousReportsOutputSchema },
  prompt: `You are an AI assistant helping human moderators analyze user reports for a city intelligence platform called Street Pulse.
Your primary task is to identify reports that might contain false information, indicate a dangerous incident, or require immediate human review.

Analyze the provided report content and determine if it is suspicious. Provide a clear reason for your assessment and recommend an action for the moderator.

Report Category: {{{reportCategory}}}
Report Content: """{{{reportContent}}}"""

Consider the following when making your assessment:
- **False Information**: Look for inconsistencies, highly improbable claims, lack of specific details, or content that contradicts known facts.
- **Dangerous Incidents**: Identify reports describing crimes, threats, severe accidents, or any situation that could pose a risk to public safety.
- **Urgency**: Prioritize reports that suggest immediate danger or widespread impact.

Your output MUST be a JSON object matching the FlagSuspiciousReportsOutputSchema.
If the report is not suspicious, set 'isSuspicious' to false, 'suspicionReason' to "None", and 'recommendedAction' to "clear".`,
});

const flagSuspiciousReportsFlow = ai.defineFlow(
  {
    name: 'flagSuspiciousReportsFlow',
    inputSchema: FlagSuspiciousReportsInputSchema,
    outputSchema: FlagSuspiciousReportsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to get output from prompt.');
    }
    return output;
  }
);
