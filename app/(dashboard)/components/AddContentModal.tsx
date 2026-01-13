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
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/content/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("File upload failed");
    }

    const data = await res.json();
    return data.url; // secure_url from Cloudinary
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let finalUrl = inputUrl;

      // If file selected → upload first
      if (file) {
        finalUrl = await uploadFile(file);
      }

      if (!finalUrl) {
        setError("Please provide a URL or upload a file");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: finalUrl,
          categoryId: activeCategoryId,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save content");
      }

      onClose();
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
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
            {/* File Upload */}
            <div>
              <label className="text-sm mb-1 block">
                Upload file (optional)
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.gif"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full text-sm"
              />
            </div>

            {/* OR separator */}
            <div className="text-center text-xs text-text-muted">
              OR
            </div>

            {/* URL Input */}
            <div>
              <label className="text-sm mb-1 block">
                Content URL
              </label>
              <input
                type="url"
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
                disabled={loading}
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
