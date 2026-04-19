import { Download, Eye, Star } from "lucide-react";

interface MaterialCardProps {
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  rating: number;
  downloads: number;
  imageUrl?: string;
}

export function MaterialCard({
  title,
  level,
  category,
  rating,
  downloads,
  imageUrl,
}: MaterialCardProps) {
  const levelColors = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-blue-100 text-blue-700",
    Advanced: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
      <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-6xl text-secondary opacity-30">📚</div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`px-3 py-1 rounded-full text-xs ${levelColors[level]}`}
            style={{ fontWeight: 600 }}
          >
            {level}
          </span>
          <span className="text-xs text-muted-foreground">{category}</span>
        </div>
        <h3 className="text-lg text-primary mb-3" style={{ fontWeight: 600 }}>
          {title}
        </h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span>{rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="w-4 h-4" />
            <span>{downloads}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Download
          </button>
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-all">
            <Eye className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
