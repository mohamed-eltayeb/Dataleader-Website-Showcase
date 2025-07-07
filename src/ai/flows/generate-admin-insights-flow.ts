'use server';
/**
 * @fileOverview An AI agent that provides strategic insights for the admin dashboard.
 *
 * - generateAdminInsights - Generates actionable insights based on recent activity.
 * - GenerateAdminInsightsInput - The input type for the generateAdminInsights function.
 * - GenerateAdminInsightsOutput - The return type for the generateAdminInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAdminInsightsInputSchema = z.object({
  newRfqs: z.array(z.string()).describe('A list of summaries for new RFQs.'),
  newContacts: z.number().describe('The number of new contact messages.'),
  popularProducts: z.array(z.object({
    name: z.string(),
    views: z.number(),
  })).describe('A list of products with their recent view counts.'),
});
export type GenerateAdminInsightsInput = z.infer<typeof GenerateAdminInsightsInputSchema>;

const InsightSchema = z.object({
    title: z.string().describe('A short, catchy title for the insight.'),
    description: z.string().describe('A detailed description of the insight and recommended action.'),
    priority: z.enum(['High', 'Medium', 'Low']).describe('The priority level of the insight.'),
    productFocus: z.string().optional().describe('The product name this insight relates to, if any.'),
});

const GenerateAdminInsightsOutputSchema = z.object({
  insights: z.array(InsightSchema).describe('A list of actionable insights for the admin.'),
});
export type GenerateAdminInsightsOutput = z.infer<typeof GenerateAdminInsightsOutputSchema>;

export async function generateAdminInsights(input: GenerateAdminInsightsInput): Promise<GenerateAdminInsightsOutput> {
  return generateAdminInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAdminInsightsPrompt',
  input: {schema: GenerateAdminInsightsInputSchema},
  output: {schema: GenerateAdminInsightsOutputSchema},
  prompt: `You are a business strategy AI for "Data Leader", a technology company. Your role is to analyze recent activity and provide actionable insights for the admin team to help them prioritize tasks and drive sales.

Here is the recent activity data:
- **New RFQs:** {{newRfqs.length}}
  - Summaries:
  {{#each newRfqs}}
  - {{{this}}}
  {{/each}}
- **New Contact Messages:** {{newContacts}}
- **Product Activity (by views):**
  {{#each popularProducts}}
  - {{name}}: {{views}} views
  {{/each}}

Based on this data, generate 2-3 strategic insights. For each insight:
1.  **Identify Opportunities or Risks**: Is there a popular product we can promote? A high-value RFQ to prioritize? A recurring issue in contact messages?
2.  **Suggest Action**: What should the admin do next? (e.g., "Launch a marketing campaign for Product X," "Immediately contact the client for RFQ Y," "Review contact messages for common themes.")
3.  **Assign Priority**: Label it as 'High', 'Medium', or 'Low' priority.
4.  **Product Focus**: If the insight is about a specific product, mention its name.

Focus on creating clear, concise, and highly actionable recommendations.
`,
});

const generateAdminInsightsFlow = ai.defineFlow(
  {
    name: 'generateAdminInsightsFlow',
    inputSchema: GenerateAdminInsightsInputSchema,
    outputSchema: GenerateAdminInsightsOutputSchema,
  },
  async input => {
    // In a real application, you might add more logic here, like fetching data from a database.
    const {output} = await prompt(input);
    return output!;
  }
);
