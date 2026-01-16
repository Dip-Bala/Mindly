"use client";

import { useEffect, useState } from "react";
import { ArrowLeftToLine, Circle, CirclePlus, PanelLeft } from "lucide-react";
import AddCategoryModal from "./AddCategoryModal";
import { CATEGORY_CONFIG } from "@/lib/categoryConfig";
import CategoryItem from "./CategoryItem";

type Category = {
  _id: string;
  name: string;
};

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  activeCategory: Category | null;
  onSelectCategory: (category: Category) => void;
};

export default function Sidebar({
  open,
  onClose,
  activeCategory,
  onSelectCategory,
}: SidebarProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  async function fetchCategories() {
    try {
      const res = await fetch("/api/categories");
      if (!res.ok) return;

      const data = await res.json();
      setCategories(data.category);
    } catch (e) {
      console.error("Failed to fetch categories", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);
  
  useEffect(() => {
  if (!loading && categories.length > 0 && !activeCategory) {
    // Prefer Inbox
    const inbox =
      categories.find((c) => c.name === "Inbox") ?? categories[0];

    onSelectCategory(inbox);
  }
}, [loading, categories, activeCategory, onSelectCategory]);


  return (
    <aside
      className={`
        fixed md:static z-40
        h-full w-64
        bg-surface
        border-r border-border
        p-4
        transform transition-transform duration-200
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Logo */}

      <div className="flex justify-between">
        <div className="font-logo text-xl font-bold text-text p-1">
          Memoir<span className="text-primary-deep">•</span>
        </div>

        {/* collapse button */}
        <button
          onClick={onClose}
          className="text-text-secondary font-light cursor-pointer hover:bg-surface-elevated p-1 rounded-lg"
        >
          <PanelLeft size={24} strokeWidth={1.25} />
        </button>
      </div>

      {/* Add Category button */}
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 p-2 w-full rounded-md text-sm font-medium hover:bg-surface-elevated text-primary-deep cursor-pointer mt-4 mb-2"
      >
        <CirclePlus size={18} />
        <span>Add Category</span>
      </button>

      {/* Categories */}
      <div className="flex-1 space-y-2">
        {loading && <p className="text-sm opacity-50">Loading...</p>}

        {!loading &&
          categories.map((cat) => (
            <CategoryItem
              key={cat._id}
              category={cat}
              isActive={activeCategory?._id === cat._id}
              onSelect={onSelectCategory}
            />
          ))}
      </div>

      {showModal && (
        <AddCategoryModal
          onClose={() => {
            setShowModal(false);
            fetchCategories(); // refresh after adding
          }}
        />
      )}
    </aside>
  );
}
