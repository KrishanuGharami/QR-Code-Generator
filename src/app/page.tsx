import { QRCodeGenerator } from '@/components/qr-code-generator';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24 bg-background">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
          QR Code Generator
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Generate, customize, and share QR codes in seconds. Enter any text or URL to get started.
        </p>
      </div>
      <QRCodeGenerator />
    </main>
  );
}
