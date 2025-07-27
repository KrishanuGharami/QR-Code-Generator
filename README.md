# QR Code Generator

A modern, feature-rich QR code generator built with Next.js, ShadCN UI, and the power of AI. Create, customize, and share QR codes in seconds.

![QR Code Generator Screenshot]("https://github.com/user-attachments/assets/8547a6cf-a8e5-442e-b7a2-d5b2f90def6e")


---

## ✨ Features

-   **Instant QR Code Generation:** Type any URL or text and see your QR code appear instantly.
-   **AI-Powered Label Suggestions:** Don't know what to label your QR code? Let our AI assistant suggest a short, descriptive label for you.
-   **Live Preview:** See exactly what your QR code will look like as you type, including the custom label.
-   **Download as PNG:** Save a high-resolution PNG image of your QR code for use in print or digital media.
-   **Copy to Clipboard:** Quickly copy the content of your QR code with a single click.
-   **Sleek & Modern UI:** A beautiful and intuitive interface built with ShadCN UI and Tailwind CSS.
-   **Dark Mode:** Easy on the eyes with a stunning dark mode theme.

## 🚀 Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **AI Integration:** [Google AI & Genkit](https://firebase.google.com/docs/genkit)
-   **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **Deployment:** Ready for [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

## 🛠️ Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   npm, pnpm, or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of your project and add your Google AI API key:
    ```.env.local
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

### Running the Development Server

1.  **Start the Genkit AI services:**
    In a separate terminal, run the Genkit development server:
    ```bash
    npm run genkit:watch
    ```

2.  **Start the Next.js application:**
    ```bash
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## 🤖 AI Flow

The application uses Genkit to define a server-side AI flow (`suggest-qr-code-description.ts`) that takes the content of the QR code as input. It then prompts a Google AI model to return a concise, relevant description, which is displayed to the user as a suggestion. This flow is exposed to the client via a Next.js Server Action for seamless integration.

## 📁 Project Structure

```
.
├── src
│   ├── ai
│   │   ├── flows/suggest-qr-code-description.ts  # Genkit flow for AI suggestions
│   │   └── genkit.ts                             # Genkit configuration
│   ├── app
│   │   ├── actions.ts                            # Next.js Server Actions
│   │   ├── page.tsx                              # Main application page
│   │   └── layout.tsx                            # Root layout
│   ├── components
│   │   ├── qr-code-generator.tsx                 # The main interactive component
│   │   └── ui/                                   # ShadCN UI components
│   └── lib
│       └── utils.ts                              # Utility functions
├── public/
├── tailwind.config.ts
└── next.config.ts
```

