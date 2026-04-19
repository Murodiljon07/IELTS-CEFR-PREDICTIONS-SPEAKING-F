export interface Material {
  id: number;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  rating: number;
  downloads: number;
  price: number;
  isFree?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
}
