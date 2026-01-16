"use client";

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
  }

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-primary-soft/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-sm rounded-lg p-6 space-y-4 bg-surface">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">New Category</h2>
            <button
              onClick={onClose}
              className="cursor-pointer hover:bg-surface-elevated p-2 rounded-full"
            >
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

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="w-full cursor-pointer bg-primary text-black p-2 rounded-md disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
