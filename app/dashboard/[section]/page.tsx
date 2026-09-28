import { notFound } from "next/navigation";
import { sections } from "@/lib/sections";

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const data = sections[section];
  if (!data) notFound();
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-ink">{data.title}</h1>
      <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 text-ink-secondary">
            <tr>{data.columns.map((c) => <th key={c} className="px-6 py-3 font-medium">{c}</th>)}</tr>
          </thead>
          <tbody>
            {data.rows.map((r, i) => (
              <tr key={i} className="border-b border-gray-100 last:border-0">
                {r.map((cell, j) => <td key={j} className="px-6 py-3 text-ink">{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
