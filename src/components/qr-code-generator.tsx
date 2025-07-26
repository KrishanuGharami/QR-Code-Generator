"use client";

import { useState, useRef, useTransition, useCallback } from 'react';
import QRCode from 'react-qr-code';
import { toPng } from 'html-to-image';
import { Download, Copy, Sparkles, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { getSuggestion } from '@/app/actions';

const filter = (node: HTMLElement) => {
    // we need to filter out the google fonts stylesheet
    return (node.tagName !== 'LINK') || !node.hasAttribute('href') || !node.getAttribute('href')!.startsWith('https://fonts.googleapis.com');
}

export function QRCodeGenerator() {
    const [qrValue, setQrValue] = useState('');
    const [label, setLabel] = useState('');
    const qrCodeRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();
    const [isSuggesting, startSuggestionTransition] = useTransition();

    const handleDownload = useCallback(async () => {
        if (!qrCodeRef.current) return;
        try {
            const dataUrl = await toPng(qrCodeRef.current, { cacheBust: true, pixelRatio: 2, filter });
            const link = document.createElement('a');
            link.download = `${label.trim().replace(/ /g, '_') || 'qrcode'}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error(err);
            toast({
                title: "Download Error",
                description: "Failed to download QR code. Please try again.",
                variant: "destructive",
            });
        }
    }, [label, toast]);

    const handleCopy = useCallback(() => {
        if (!qrValue) return;
        navigator.clipboard.writeText(qrValue)
            .then(() => {
                toast({ title: "Copied to clipboard!", description: "The QR code content has been copied." });
            })
            .catch(() => {
                toast({
                    title: "Copy Error",
                    description: "Failed to copy content to clipboard.",
                    variant: "destructive",
                });
            });
    }, [qrValue, toast]);

    const handleSuggestDescription = () => {
        if (!qrValue) {
            toast({
                title: "Input Required",
                description: "Please enter some text or a URL before suggesting a label.",
                variant: "destructive",
            });
            return;
        }
        startSuggestionTransition(async () => {
            try {
                const result = await getSuggestion({ qrCodeContent: qrValue });
                setLabel(result);
                 toast({
                    title: "Suggestion Ready",
                    description: "An AI-powered label has been generated for you.",
                });
            } catch (error) {
                toast({
                    title: "AI Suggestion Failed",
                    description: "Could not get a suggestion at this time. Please try again later.",
                    variant: "destructive",
                });
            }
        });
    };

    const isQrVisible = qrValue.length > 0;

    return (
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <Card className="w-full shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Configure Your Code</CardTitle>
                    <CardDescription>Enter content, add an optional label, and get creative.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="qr-content" className="font-semibold">Content (URL or Text)</Label>
                        <Input
                            id="qr-content"
                            placeholder="e.g., https://your-website.com"
                            value={qrValue}
                            onChange={(e) => setQrValue(e.target.value)}
                            className="text-base"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="qr-label" className="font-semibold">Label (Optional)</Label>
                        <div className="flex items-center gap-2">
                            <Input
                                id="qr-label"
                                placeholder="e.g., My Personal Website"
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                className="text-base"
                            />
                            <Button variant="outline" size="icon" onClick={handleSuggestDescription} disabled={isSuggesting || !qrValue} aria-label="Suggest Label">
                                {isSuggesting ? <Loader2 className="animate-spin" /> : <Sparkles />}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="w-full shadow-lg flex flex-col items-center justify-between min-h-[450px]">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Preview</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex items-center justify-center p-4">
                    <div className="aspect-square p-6 bg-white rounded-xl shadow-inner flex flex-col items-center justify-center gap-4 transition-opacity duration-300" style={{ opacity: isQrVisible ? 1 : 0.5 }}>
                        {isQrVisible ? (
                            <div ref={qrCodeRef} className="bg-white p-4 rounded-lg flex flex-col items-center gap-2">
                                <QRCode
                                    value={qrValue}
                                    size={220}
                                    level={"H"}
                                    viewBox={`0 0 256 256`}
                                    fgColor="#000000"
                                    bgColor="#FFFFFF"
                                />
                                {label && <p className="text-center font-medium text-sm mt-2 text-black max-w-[220px] break-words">{label}</p>}
                            </div>
                        ) : (
                            <div className="text-muted-foreground text-center flex flex-col items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><path d="M5 5h3v3H5zm0 8h3v3H5zm8-8h3v3h-3zm0 8h3v3h-3zM5 13h3v-3H5zm8 0h3v-3h-3zm-8 5h3v-3H5zm8 5h3v-3h-3z"/><path d="M13 5h3v3h-3zm0 8h3v3h-3z"/></svg>
                                <p>Your QR code will appear here</p>
                            </div>
                        )}
                    </div>
                </CardContent>
                {isQrVisible && (
                    <CardFooter className="gap-4 p-6 bg-muted/50 w-full justify-center">
                        <Button onClick={handleDownload} variant="default" className="bg-accent hover:bg-accent/90">
                            <Download /> Download PNG
                        </Button>
                        <Button onClick={handleCopy} variant="secondary">
                            <Copy /> Copy Content
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
}
