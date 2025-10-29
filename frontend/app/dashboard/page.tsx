'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import AlertChart from '@/components/AlertChart';

export default function Dashboard() {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const statsData = await api.getStats();
      setStats(statsData.data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const totalAlerts = stats.reduce((sum, m) => sum + m.count, 0);
  const avgPerMonth = stats.length > 0 ? Math.round(totalAlerts / stats.length) : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Alertes</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{totalAlerts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Mois actifs</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Moyenne / mois</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">{avgPerMonth}</p>
        </div>
      </div>
      
      <AlertChart data={stats} />
    </div>
  );
}
