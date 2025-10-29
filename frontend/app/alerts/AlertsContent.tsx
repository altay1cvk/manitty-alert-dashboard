'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import AlertCard from '@/components/AlertCard';

export default function AlertsContent() {
  const searchParams = useSearchParams();
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAlerts();
  }, [searchParams]);

  const loadAlerts = async () => {
    try {
      const year = searchParams.get('year');
      const month = searchParams.get('month');
      const subject = searchParams.get('subject');

      const data = year && month 
        ? await api.getAlertsByMonth(year, month, subject || undefined)
        : await api.getAlerts(subject || undefined);

      setAlerts(data.data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-12">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Alertes</h1>
      {alerts.length === 0 ? (
        <p className="text-center py-12 text-gray-500">Aucune alerte trouvée</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {alerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      )}
    </div>
  );
}
