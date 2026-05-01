export interface Material {
  id: Number;
  name: String;
  level: "beginner" | "intermediate" | "advanced";

  category:
    | "IELTS"
    | "grammar"
    | "vocabulary"
    | "reading"
    | "listening"
    | "writing"
    | "speaking";

  file?: String;

  banner?: String;
  rate: Number;
  salary: Number;
  createdAt: Date;
}
