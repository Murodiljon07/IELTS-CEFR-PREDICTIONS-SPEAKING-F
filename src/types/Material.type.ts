export interface Material {
  _id: string;
  name: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  price: number;
  rate: number;
  createdAt: string;
  file?: {
    fileName?: string;
    contentType?: string;
    size?: number;
  } | null;
}
