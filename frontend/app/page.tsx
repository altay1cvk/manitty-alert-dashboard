'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setIsLoading(false);
        if (data && data.sub) {
          router.push('/dashboard');
        }
      })
      .catch(() => setIsLoading(false));
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-5xl font-bold mb-6">Manitty Alert Dashboard</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Système de monitoring d'alertes IoT. Connectez-vous pour accéder au tableau de bord.
      </p>
      <a href="/api/auth/login" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg">
        Se connecter
      </a>
    </div>
  );
}
