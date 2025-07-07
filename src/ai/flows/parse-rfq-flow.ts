'use server';
/**
 * @fileOverview An RFQ (Request for Quotation) parsing AI agent.
 *
 * - parseRfq - A function that analyzes RFQ text and matches it to products.
 * - ParseRfqInput - The input type for the parseRfq function.
 * - ParseRfqOutput - The return type for the parseRfq function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ParseRfqInputSchema = z.object({
  rfqText: z.string().describe('The raw text of the Request for Quotation (RFQ) from a customer.'),
  availableProducts: z.string().describe('A JSON string of available products and their descriptions, which the AI will use for matching.'),
});
export type ParseRfqInput = z.infer<typeof ParseRfqInputSchema>;

const ParseRfqOutputSchema = z.object({
  cleanedRfq: z.string().describe('A clear, concise summary of the RFQ, rewritten for an internal sales team.'),
  extractedRequirements: z.array(z.object({
    requirement: z.string().describe('The specific requirement extracted.'),
    detail: z.string().describe('The detail or value associated with the requirement.'),
  })).describe('A list of key technical and functional requirements identified in the RFQ.'),
  productMatches: z.array(z.object({
    productName: z.string().describe('The name of the matched product.'),
    relevance: z.string().describe('An explanation of why this product is a good match for the customer\'s needs.'),
  })).describe('A list of suggested products from the catalog that are relevant to the RFQ.'),
});
export type ParseRfqOutput = z.infer<typeof ParseRfqOutputSchema>;

export async function parseRfq(input: ParseRfqInput): Promise<ParseRfqOutput> {
  return parseRfqFlow(input);
}

const prompt = ai.definePrompt({
  name: 'parseRfqPrompt',
  input: {schema: ParseRfqInputSchema},
  output: {schema: ParseRfqOutputSchema},
  prompt: `You are an expert sales engineer for "Data Leader", a technology company specializing in smart buildings, IT, security, and solar energy.
Your task is to analyze a customer's Request for Quotation (RFQ) and provide a structured analysis.
You will be given the raw RFQ text and a JSON string of available products.

Available Products:
\`\`\`json
{{{availableProducts}}}
\`\`\`

Customer RFQ:
---
{{{rfqText}}}
---

Based on the information, perform the following tasks:
1.  **Clean and Summarize**: Rewrite the RFQ into a clear, concise summary for the internal sales team. Focus on the core needs and remove any boilerplate or conversational text.
2.  **Extract Key Requirements**: Identify and list the specific technical and functional requirements mentioned in the RFQ. For each requirement, provide a short detail.
3.  **Match Products**: Suggest up to 3 products from the "Available Products" list that best match the customer's needs. For each match, provide a brief explanation of its relevance. If no products seem to match, state that clearly.
`,
});

const parseRfqFlow = ai.defineFlow(
  {
    name: 'parseRfqFlow',
    inputSchema: ParseRfqInputSchema,
    outputSchema: ParseRfqOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
