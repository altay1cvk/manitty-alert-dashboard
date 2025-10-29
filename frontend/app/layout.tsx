import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Manitty Alert Dashboard',
  description: 'IoT Alert Monitoring System',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50 min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
