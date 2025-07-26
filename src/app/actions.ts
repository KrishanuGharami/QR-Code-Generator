'use server';

import { suggestQrCodeDescription, SuggestQrCodeDescriptionInput } from '@/ai/flows/suggest-qr-code-description';

/**
 * Calls the Genkit AI flow to get a suggested description for the given QR code content.
 * @param input - The content of the QR code.
 * @returns A promise that resolves to the suggested description string.
 */
export async function getSuggestion(input: SuggestQrCodeDescriptionInput): Promise<string> {
    try {
        const result = await suggestQrCodeDescription(input);
        return result.suggestedDescription;
    } catch (e) {
        console.error("Failed to get suggestion from AI:", e);
        // Re-throw a more user-friendly error to be caught by the client component.
        throw new Error('An error occurred while communicating with the AI service.');
    }
}
