export type Rule = {
  year: number;
  title: string;
  summary: string;
  tags: string[];
  appliesTo: string[]; // t.ex. ["B","BE"]
};

export const rules: Rule[] = [
  {
    year: 2008,
    title: "Halvljuskrav dagtid",
    summary: "Halvljus dagtid blev krav för motorfordon.",
    tags: ["Belysning"],
    appliesTo: ["A", "B", "BE", "C", "CE", "D", "DE"],
  },
  {
    year: 2011,
    title: "Tydligare vinterdäckskrav",
    summary: "Regler och period för vinterdäck tydliggjordes.",
    tags: ["Däck"],
    appliesTo: ["A", "B", "BE", "C", "CE", "D", "DE"],
  },
  {
    year: 2013,
    title: "Lokala dubbdäcksförbud",
    summary: "Fler lokala restriktioner och tydligare skyltning.",
    tags: ["Däck"],
    appliesTo: ["A", "B", "BE", "C", "CE", "D", "DE"],
  },
  {
    year: 2018,
    title: "Mobilförbud i handen",
    summary: "Förbud att hålla mobil/kommunikationsutrustning i handen under körning.",
    tags: ["Trafiksäkerhet"],
    appliesTo: ["A", "B", "BE", "C", "CE", "D", "DE"],
  },
  {
    year: 2021,
    title: "Utökad B-behörighet (B96)",
    summary: "Regler kring utökad B-behörighet användes/tydliggjordes i utbildning och prov.",
    tags: ["Behörighet"],
    appliesTo: ["B", "BE"],
  },
  {
    year: 2022,
    title: "Nya regler för elsparkcyklar",
    summary: "Exempelpost: regler förändras över tid och kan filtreras per behörighet.",
    tags: ["Trafiksäkerhet"],
    appliesTo: ["A", "B", "BE", "C", "CE", "D", "DE"],
  },
];
