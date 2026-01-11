"use client";

import { useEffect, useState } from "react";
import { CirclePlus } from "lucide-react";
import AddCategoryModal from "./AddCategoryModal";

type Category = {
  _id: string;
  name: string;
  color?: string;
};

export default function Sidebar() {
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

  return (
    <div className="h-screen w-64 border-r p-4 flex flex-col gap-4">
      
      {/* Categories */}
      <div className="flex-1 space-y-2">
        <p className="text-sm opacity-70 mb-2">Categories</p>

        {loading && (
          <p className="text-sm opacity-50">Loading...</p>
        )}

        {!loading &&
          categories.map((cat) => (
            <button
              key={cat._id}
              className="w-full text-left px-2 py-1 rounded-md hover:bg-muted"
            >
              {cat.name}
            </button>
          ))}
      </div>

      {/* Add category */}
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 border p-2 rounded-md hover:bg-muted"
      >
        <CirclePlus size={18} />
        <span>Add Category</span>
      </button>

      {showModal && (
        <AddCategoryModal
          onClose={() => {
            setShowModal(false);
            fetchCategories(); // refresh after adding
          }}
        />
      )}
    </div>
  );
}
