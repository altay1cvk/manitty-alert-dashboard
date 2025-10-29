'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Manitty
        </Link>

        <div className="flex items-center gap-6">
          {user && (
            <>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/alerts" className="text-gray-700 hover:text-blue-600">
                Alertes
              </Link>
            </>
          )}

          {!isLoading && (
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <span className="text-gray-600">{user.name || user.email}</span>
                  <a href="/api/auth/logout" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                    Déconnexion
                  </a>
                </>
              ) : (
                <a href="/api/auth/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                  Connexion
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
