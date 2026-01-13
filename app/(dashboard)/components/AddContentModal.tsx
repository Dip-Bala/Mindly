"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface AddContentModalProps {
  activeCategoryId: string;
  onClose: () => void;
}

export default function AddContentModal({
  activeCategoryId,
  onClose,
}: AddContentModalProps) {
  const [inputUrl, setInputUrl] = useState("");
  const [category, setCategory] = useState(activeCategoryId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: inputUrl,
        categoryId: category,
      }),
    });

    if (!res.ok) {
      setError("Failed to save content");
      setLoading(false);
      return;
    }

    setLoading(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="bg-surface w-full max-w-md rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Add Content</h2>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-surface-elevated"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* URL Input */}
            <div>
              <label className="text-sm mb-1 block">
                Content URL
              </label>
              <input
                type="url"
                required
                placeholder="https://..."
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="
                  w-full px-3 py-2 rounded-md
                  border border-border
                  bg-background
                "
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading || !inputUrl.trim()}
                className="px-4 py-2 rounded bg-primary text-black disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
