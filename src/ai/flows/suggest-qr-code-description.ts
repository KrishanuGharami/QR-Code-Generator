'use server';
/**
 * @fileOverview Provides a Genkit flow to suggest a description for a QR code based on its content (URL or text).
 *
 * - suggestQrCodeDescription - An async function that takes the QR code content and returns a suggested description.
 * - SuggestQrCodeDescriptionInput - The input type for the suggestQrCodeDescription function.
 * - SuggestQrCodeDescriptionOutput - The return type for the suggestQrCodeDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestQrCodeDescriptionInputSchema = z.object({
  qrCodeContent: z.string().describe('The content of the QR code, which can be a URL or any text.'),
});
export type SuggestQrCodeDescriptionInput = z.infer<typeof SuggestQrCodeDescriptionInputSchema>;

const SuggestQrCodeDescriptionOutputSchema = z.object({
  suggestedDescription: z.string().describe('A suggested description for the QR code content.'),
});
export type SuggestQrCodeDescriptionOutput = z.infer<typeof SuggestQrCodeDescriptionOutputSchema>;

export async function suggestQrCodeDescription(input: SuggestQrCodeDescriptionInput): Promise<SuggestQrCodeDescriptionOutput> {
  return suggestQrCodeDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestQrCodeDescriptionPrompt',
  input: {schema: SuggestQrCodeDescriptionInputSchema},
  output: {schema: SuggestQrCodeDescriptionOutputSchema},
  prompt: `You are an AI assistant that suggests descriptions for QR codes. Given the content of the QR code, provide a short, descriptive label that would help the user remember what the QR code is for.\n\nQR Code Content: {{{qrCodeContent}}}`,
});

const suggestQrCodeDescriptionFlow = ai.defineFlow(
  {
    name: 'suggestQrCodeDescriptionFlow',
    inputSchema: SuggestQrCodeDescriptionInputSchema,
    outputSchema: SuggestQrCodeDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
