'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useRouter } from 'next/navigation';

interface ChartData {
  month: string;
  count: number;
}

interface AlertChartProps {
  data: ChartData[];
  subject?: string;
}

export default function AlertChart({ data, subject }: AlertChartProps) {
  const router = useRouter();

  const handleBarClick = (data: any) => {
    if (data && data.month) {
      const [year, month] = data.month.split('-');
      const subjectParam = subject ? `&subject=${subject}` : '';
      router.push(`/alerts?year=${year}&month=${month}${subjectParam}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Alertes par mois</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} onClick={handleBarClick}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#0070f3" cursor="pointer" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-sm text-gray-500 mt-4 text-center">
        Cliquez sur une barre pour voir les alertes du mois
      </p>
    </div>
  );
}
