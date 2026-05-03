export interface Material {
  id: number;
  name: string;
  level: "beginner" | "intermediate" | "advanced";

  category:
    | "IELTS"
    | "grammar"
    | "vocabulary"
    | "reading"
    | "listening"
    | "writing"
    | "speaking";

  file?: string;

  banner?: string;
  rate: number;
  salary: number;
  createdAt: Date;
}
