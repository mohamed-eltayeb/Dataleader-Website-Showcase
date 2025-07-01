// src/ai/flows/localized-greeting.ts
'use server';
/**
 * @fileOverview A localized greeting AI agent.
 *
 * - generateGreeting - A function that generates a localized greeting.
 * - LocalizedGreetingInput - The input type for the generateGreeting function.
 * - LocalizedGreetingOutput - The return type for the generateGreeting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LocalizedGreetingInputSchema = z.object({
  language: z
    .string()
    .describe('The language to generate the greeting in (e.g., en, ar).'),
  name: z.string().optional().describe('The name of the visitor.'),
});
export type LocalizedGreetingInput = z.infer<typeof LocalizedGreetingInputSchema>;

const LocalizedGreetingOutputSchema = z.object({
  greeting: z.string().describe('The localized greeting message.'),
});
export type LocalizedGreetingOutput = z.infer<typeof LocalizedGreetingOutputSchema>;

export async function generateGreeting(input: LocalizedGreetingInput): Promise<LocalizedGreetingOutput> {
  return localizedGreetingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'localizedGreetingPrompt',
  input: {schema: LocalizedGreetingInputSchema},
  output: {schema: LocalizedGreetingOutputSchema},
  prompt: `You are a sophisticated AI assistant that generates localized greetings for website visitors, taking into account cultural nuances.

  {% if name %}
  Generate a greeting for {{name}} in {{language}} that is culturally appropriate.
  {% else %}
  Generate a general greeting in {{language}} that is culturally appropriate.
  {% endif %}
  
  The greeting should be friendly and welcoming.  Incorporate regional slang if appropriate to the language, but ensure the greeting remains professional for a business website.
  Keep the greeting short and concise.
  `,
});

const localizedGreetingFlow = ai.defineFlow(
  {
    name: 'localizedGreetingFlow',
    inputSchema: LocalizedGreetingInputSchema,
    outputSchema: LocalizedGreetingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
