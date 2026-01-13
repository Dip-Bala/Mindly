
import { Circle } from "lucide-react";
import { CATEGORY_CONFIG } from "@/lib/categoryConfig";

type Category = {
  _id: string;
  name: string;
  color: string;
};

type Props = {
  category: Category;
  isActive: boolean;
  onSelect: (category: Category) => void;
};

export default function CategoryItem({
  category,
  isActive,
  onSelect,
}: Props) {
  const config = CATEGORY_CONFIG[category.name] ?? {
    icon: Circle,
    colorKey: category.color || "neutral",
  };

  const Icon = config.icon;
  const c = config.colorKey;
  // console.log(c)

  return (
    <button
      onClick={() => onSelect(category)}
      className={`
        flex items-center gap-2 w-full px-2 py-1 rounded-md
        transition-colors
        cursor-pointer font-normal
        ${
          isActive
            ? `
            
              bg-primary-soft
              text-black
            `
            : `
              text-text-secondary
              hover:bg-surface-elevated
            `
        }
      `}
    >
      <Icon size={16} />
      <span className="truncate">{category.name}</span>
    </button>
  );
}
