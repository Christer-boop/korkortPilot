"use client";

import { useMemo, useState } from "react";
import { rules } from "./data/rules";

const licenses = ["A", "B", "BE", "C", "CE", "D", "DE"] as const;

export default function Home() {
  const [year, setYear] = useState("");
  const [lic, setLic] = useState<(typeof licenses)[number]>("B");

  const currentYear = new Date().getFullYear();
  const years = useMemo(
    () => Array.from({ length: currentYear - 1970 + 1 }, (_, i) => currentYear - i),
    [currentYear]
  );

  const filteredRules = useMemo(() => {
    const y = Number(year);
    if (!y) return [];
    return rules
      .filter((r) => r.year >= y)
      .filter((r) => r.appliesTo.includes(lic))
      .sort((a, b) => b.year - a.year);
  }, [year, lic]);

  return (
    <main className="min-h-screen bg-gray-50 p-10 font-sans">
      <h1 className="text-2xl font-bold mb-4">Körkort.nu – Pilot</h1>

      <p className="mt-2 text-sm text-gray-600">
        Välj år och behörighet för att se exempel på regeländringar.
      </p>

      <div className="mt-6 flex flex-col gap-4 max-w-md">
        <div>
          <p>Vilket år tog du körkort?</p>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="mt-2 rounded-md border px-3 py-2 w-full"
          >
            <option value="">Välj år…</option>
            {years.map((y) => (
              <option key={y} value={String(y)}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p>Vilken behörighet?</p>
          <select
            value={lic}
            onChange={(e) => setLic(e.target.value as (typeof licenses)[number])}
            className="mt-2 rounded-md border px-3 py-2 w-full"
          >
            {licenses.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredRules.length > 0 && (
        <div className="mt-8 grid gap-4 max-w-2xl">
          {filteredRules.map((r) => (
            <div
              key={`${r.year}-${r.title}`}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold">{r.title}</div>
                <div className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                  {r.year}
                </div>
              </div>

              <p className="mt-2 text-sm text-gray-700">{r.summary}</p>

              {r.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {r.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-gray-100 rounded-full px-2 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
