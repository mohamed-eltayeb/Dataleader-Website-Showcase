'use server';
/**
 * @fileOverview A quotation generation AI agent.
 *
 * - generateQuote - A function that handles generating a professional quote summary.
 * - GenerateQuoteInput - The input type for the generateQuote function.
 * - GenerateQuoteOutput - The return type for the generateQuote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuoteInputSchema = z.object({
  productName: z.string().describe('The name of the product being configured.'),
  language: z.string().describe('The language for the quote (en or ar).'),
  selections: z.array(z.object({
      label: z.string(),
      choice: z.string(),
  })).describe('An array of user-selected options and their choices.'),
  basePrice: z.number().describe('The starting price of the product.'),
  totalPrice: z.number().describe('The final calculated price after all modifications.')
});
export type GenerateQuoteInput = z.infer<typeof GenerateQuoteInputSchema>;

const GenerateQuoteOutputSchema = z.object({
  summary: z.string().describe('A professionally formatted, friendly quote summary. Use Markdown for formatting.'),
});
export type GenerateQuoteOutput = z.infer<typeof GenerateQuoteOutputSchema>;

export async function generateQuote(input: GenerateQuoteInput): Promise<GenerateQuoteOutput> {
  return generateQuoteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuotePrompt',
  input: {schema: GenerateQuoteInputSchema},
  output: {schema: GenerateQuoteOutputSchema},
  prompt: `You are a helpful sales assistant for "Data Leader". Your task is to generate a brief, friendly, and professional quotation summary in {{language}} based on a customer's selections.

The customer is configuring the "{{productName}}".

Here is a summary of their configuration:
{{#each selections}}
- **{{label}}**: {{choice}}
{{/each}}

The base price for this system is SAR {{basePrice}}.
Based on the selections, the total estimated price is **SAR {{totalPrice}}**.

Please generate a summary that confirms these selections and the total price. Start with a friendly opening. Use Markdown for emphasis (bolding, lists). Do not repeat the price calculation logic, just state the final price clearly. The response should be only the summary text.
`,
});

const generateQuoteFlow = ai.defineFlow(
  {
    name: 'generateQuoteFlow',
    inputSchema: GenerateQuoteInputSchema,
    outputSchema: GenerateQuoteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
