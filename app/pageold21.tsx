"use client";

import { useMemo, useState } from "react";
import { rules } from "./data/rules";

const licenses = ["B", "A", "BE", "C", "CE", "D", "DE"] as const;

export default function Home() {
  const currentYear = new Date().getFullYear();
  const years = useMemo(
    () => Array.from({ length: currentYear - 1970 + 1 }, (_, i) => currentYear - i),
    [currentYear]
  );

  // Defaults (pilot): B och lägsta år = 1970, användaren väljer sen
 const [year, setYear] = useState<number>(currentYear);

  const [lic, setLic] = useState<(typeof licenses)[number]>("B");
  const [q, setQ] = useState<string>("");
const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredRules = useMemo(() => {
    const query = q.trim().toLowerCase();

    return rules
      .filter((r) => r.year >= year)
      .filter((r) => r.appliesTo.includes(lic))
      .filter((r) => {
        if (!query) return true;
        const hay = [
          r.title,
          r.summary,
          ...(r.tags ?? []),
          r.year.toString(),
          ...(r.appliesTo ?? []),
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(query);
      })
      .sort((a, b) => b.year - a.year);
  }, [year, lic, q]);

  return (
    <main className="min-h-screen bg-gray-50 p-10 font-sans">
      {/* Pilot banner */}
      <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <strong>Pilot</strong> – exempeldata och förenklad funktion. Innehåll är inte komplett.
      </div>

      <h1 className="text-2xl font-bold mb-2">Körkort.nu – Pilot</h1>
      <p className="text-gray-700 mb-6">
        Välj år och behörighet för att se exempel på regeländringar. Sök är bara ett enkelt filter i piloten.
      </p>

      {/* Controls */}
      <div className="grid gap-4 max-w-xl">
        <div>
          <label className="block text-sm font-medium text-gray-800">
            Vilket år tog du körkort?
          </label>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="mt-2 w-full rounded-md border px-3 py-2 bg-white"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800">
            Vilken behörighet?
          </label>
          <select
            value={lic}
            onChange={(e) => setLic(e.target.value as (typeof licenses)[number])}
            className="mt-2 w-full rounded-md border px-3 py-2 bg-white"
          >
            {licenses.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800">
            Sök (titel, taggar, text)
          </label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ex: däck, mobil, belysning…"
            className="mt-2 w-full rounded-md border px-3 py-2 bg-white"
          />
        </div>
      </div>

     {/* Results */}
<div className="mt-8 max-w-2xl">
  {year && lic ? (
    filteredRules.length === 0 ? (
      <div className="rounded-lg border bg-white p-4 text-gray-700">
        Inga träffar för dina val. Testa ett tidigare år (t.ex. 2018) eller byt behörighet.
      </div>
    ) : (
      <div className="rounded-lg border bg-white">
        {filteredRules.map((r, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={`${r.year}-${r.title}`}
              className="border-b last:border-b-0"
            >
              <button
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
                className="w-full flex justify-between items-center px-4 py-3 text-left hover:bg-gray-50"
              >
                <div>
                  <div className="font-medium text-gray-900">
                    {r.title}
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {r.year}
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 text-sm text-gray-700">
                  <p className="mt-2">{r.summary}</p>

                  {r.tags?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {r.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-gray-100 px-2 py-1 text-xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 text-xs text-gray-500">
                    Gäller: {r.appliesTo.join(", ")}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    )
  ) : null}
</div>

    </main>
  );
}
