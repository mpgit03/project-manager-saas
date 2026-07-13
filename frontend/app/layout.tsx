import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Project Manager",
  description: "Modern Project Management App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>

          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 3000,
              style: {
                background: "#18181b",
                color: "#fff",
                border: "1px solid #3f3f46",
              },
              success: {
                iconTheme: {
                  primary: "#22c55e",
                  secondary: "#fff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#fff",
                },
              },
            }}
          />

          {children}

        </AuthProvider>
      </body>
    </html>
  );
}