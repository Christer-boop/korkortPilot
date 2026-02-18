// data/rules.ts

export type RuleSource = {
  type: "SFS" | "TSFS";
  ref: string;
  note?: string;
};

export type Rule = {
  year: number;

  // Valfritt: använd bara när du är säker på exakt ikraftdatum
  effectiveFrom?: string; // YYYY-MM-DD

  title: string;
  summary: string;
  tags: string[];
  appliesTo: string[]; // t.ex. ["B","BE"]

  // Valfritt: men starkt att ha på minst 2–3 poster
  source?: RuleSource;
};

export const rules: Rule[] = [
  {
    year: 2008,
    title: "Halvljuskrav dagtid",
    summary: "Halvljus eller annat godkänt ljus ska användas vid färd i dagsljus.",
    tags: ["Belysning"],
    appliesTo: ["A", "B", "BE", "C", "CE", "D", "DE"],
    // Ingen exakt SFS/datum här än – fyll på när du verifierat
  },

  {
    year: 2011,
    title: "Tydligare vinterdäckskrav",
    summary: "Regler om vinterdäck och ansvar vid vinterväglag tydliggjordes.",
    tags: ["Däck"],
    appliesTo: ["A", "B", "BE", "C", "CE", "D", "DE"],
    source: {
      type: "SFS",
      ref: "Trafikförordningen (1998:1276)",
      note: "Bestämmelser om vinterdäck (detaljer/datum verifieras i projektet)",
    },
  },

  {
    year: 2013,
    title: "Lokala dubbdäcksförbud",
    summary: "Lokala restriktioner och tydligare skyltning förekommer i vissa områden.",
    tags: ["Däck"],
    appliesTo: ["A", "B", "BE", "C", "CE", "D", "DE"],
    // Kan kompletteras med exakt källa senare om du vill
  },

  // ✅ STENHÅRD #1 (verifierad)
  {
    year: 2018,
    effectiveFrom: "2018-02-01",
    title: "Mobilförbud i handen",
    summary:
      "Förbud att använda mobil eller annan kommunikationsutrustning om du håller den i handen under körning.",
    tags: ["Trafiksäkerhet"],
    appliesTo: ["A", "B", "BE", "C", "CE", "D", "DE"],
    source: {
      type: "SFS",
      ref: "SFS 2017:1284",
      note: "Ändring i trafikförordningen (1998:1276), ikraft 2018-02-01",
    },
  },

  // ✅ STENHÅRD #2 (verifierad)
  {
    year: 2020,
    effectiveFrom: "2020-01-01",
    title: "Miljözon klass 2 och 3",
   
     summary:
  "Nya bestämmelser om miljözon klass 2 och 3 infördes genom ändring i trafikförordningen.",

    tags: ["Miljö"],
    appliesTo: ["B", "C", "CE", "D", "DE"],
    source: {
      type: "SFS",
      ref: "SFS 2018:1562",
      note: "Ändring i trafikförordningen (1998:1276), träder i kraft 2020-01-01",
    },
  },

  {
    year: 2021,
    title: "Utökad B-behörighet (B96)",
    summary:
      "Utökad B-behörighet (B96) – utbildning/prov och tillämpning kan förändras över tid.",
    tags: ["Behörighet"],
    appliesTo: ["B", "BE"],
    // Här skulle jag inte låsa datum/källa innan du verifierat exakt ändringspunkt
  },

  {
    year: 2022,
    title: "Nya regler för elsparkcyklar",
    summary:
      "Regler för elsparkcyklar och liknande fordon förändras över tid (pilotexempel).",
    tags: ["Trafiksäkerhet"],
    appliesTo: ["A", "B", "BE", "C", "CE", "D", "DE"],
    source: {
      type: "TSFS",
      ref: "Transportstyrelsens information",
      note: "Detaljer/datum verifieras i projektet (pilotexempel)",
    },
  },
];
