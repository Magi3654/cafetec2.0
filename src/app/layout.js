import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import {AppProvider} from "@/components/AppContext"
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <main className="max-w-4xl mx-auto p-4"> 
          <AppProvider>
            <Toaster></Toaster>
            <Header/>
            {children}
          </AppProvider>
        </main>
        </body>
    </html>
  );
}
