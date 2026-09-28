const monthly = [
  { m: "Apr", v: 14200 }, { m: "May", v: 17800 }, { m: "Jun", v: 16100 },
  { m: "Jul", v: 21400 }, { m: "Aug", v: 24900 }, { m: "Sep", v: 31030 },
];

export function RevenueChartPlaceholder() {
  const max = Math.max(...monthly.map((d) => d.v));
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col h-96">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-ink">Revenue Overview</h3>
        <p className="text-sm text-ink-secondary">Monthly revenue, last 6 months.</p>
      </div>
      <div className="flex-1 flex items-end gap-4" role="img" aria-label="Monthly revenue bar chart">
        {monthly.map((d) => (
          <div key={d.m} className="flex-1 h-full flex flex-col justify-end items-center gap-2">
            <div className="w-full rounded-t-md bg-primary" style={{ height: `${(d.v / max) * 85}%` }} title={`$${d.v.toLocaleString()}`} />
            <span className="text-xs text-ink-secondary">{d.m}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
