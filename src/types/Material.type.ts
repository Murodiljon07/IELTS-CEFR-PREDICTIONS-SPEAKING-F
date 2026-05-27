export interface Material {
  _id: string;
  name: string;
  banner: string;
  category: string;
  rate: number;
  level: "beginner" | "intermediate" | "advanced";
  file: string[];
  price: number;
  oldPrice: number;
  createdAt: Date;
}
