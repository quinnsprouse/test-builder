import { ThemeProvider } from "@/components/theme-provider";

import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { Toaster } from "sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexClientProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            // defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <Toaster />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ConvexClientProvider>
  );
}
