import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/hooks/useAuth";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={2000}
            pauseWhenPageIsHidden
            visibleToasts={1}
          />
          <div className=" ">{children}</div>
        </body>
      </AuthProvider>
    </html>
  );
}
