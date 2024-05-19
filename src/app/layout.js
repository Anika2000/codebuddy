import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";
import { AppProvider } from '@/components/AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Codebuddy",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <AppProvider>
      <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <ToastContainer />
          {children}
          </body>
      </html>
      </SessionWrapper>
    </AppProvider>
  );
}
