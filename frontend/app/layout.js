import "./globals.css";
import { AuthProvider } from "./auth/authContext";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>

      </body>
    </html>
  );
}
