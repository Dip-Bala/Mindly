"use client"

import Input from "@/components/ui/Input";
import { X } from "lucide-react";
import { useState } from "react";

export default function AddCategoryModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      setError("Category already exists");
      setLoading(false);
      return;
    }

    setLoading(false);
    onClose();
    // later: refetch categories
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-sm rounded-lg p-6 space-y-4">
        
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">New Category</h2>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Category name"
            placeholder="e.g. Research"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading || !name.trim()}
            className="w-full border p-2 rounded-md disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}
