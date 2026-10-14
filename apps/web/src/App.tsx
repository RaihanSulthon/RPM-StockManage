import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

const healthSchema = z.object({
  status: z.string(),
  database: z.string(),
  time: z.string(),
});

async function fetchHealth() {
  const res = await fetch('/api/health');
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return healthSchema.parse(await res.json());
}

export default function App() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth,
    retry: false,
  });

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-2xl font-semibold">RPM Stock Management</h1>
      <p className="mt-1 text-sm text-gray-500">Catering kapal: stock, PO, penerimaan, invoice</p>

      <section className="mt-6 rounded-lg border border-gray-200 p-4">
        <h2 className="text-sm font-medium text-gray-700">Status koneksi API</h2>
        {isLoading && <p className="mt-2 text-sm">Memeriksa...</p>}
        {error && (
          <p className="mt-2 text-sm text-red-600">
            API belum bisa dihubungi. Pastikan backend dan database sudah jalan.
          </p>
        )}
        {data && (
          <p className="mt-2 text-sm text-green-700">
            API: {data.status} | Database: {data.database}
          </p>
        )}
      </section>
    </main>
  );
}
