"use client";

import { useState } from "react";
import { CloudUpload, X } from "lucide-react";
import Input from "@/components/ui/Input";

interface AddContentModalProps {
  activeCategoryId: string;
  onClose: () => void;
}

function getSuggestionsFromUrl(url: string) {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace("www.", "");

    // YouTube
    if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) {
      return { title: "YouTube Video" };
    }

    // PDF
    if (url.toLowerCase().endsWith(".pdf")) {
      const name = decodeURIComponent(url.split("/").pop() || "")
        .replace(".pdf", "");
      return { title: name || "PDF Document" };
    }

    // Image
    if (/\.(jpg|jpeg|png|gif|webp)$/i.test(url)) {
      const name = decodeURIComponent(url.split("/").pop() || "")
        .replace(/\.(jpg|jpeg|png|gif|webp)$/i, "");
      return { title: name || "Image" };
    }

    // Generic link
    return { title: hostname };
  } catch {
    return null;
  }
}

export default function AddContentModal({
  activeCategoryId,
  onClose,
}: AddContentModalProps) {
  const [title, setTitle] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [autoSuggested, setAutoSuggested] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/content/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");

    const data = await res.json();
    return data.url;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let finalUrl = inputUrl;

      if (file) {
        finalUrl = await uploadFile(file);
      }

      if (!finalUrl) {
        setError("Provide a URL or upload a file");
        return;
      }

      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title || undefined,
          url: finalUrl,
          categoryId: activeCategoryId,
        }),
      });

      if (!res.ok) throw new Error();

      onClose();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="bg-surface w-full max-w-md rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Add Content</h2>
            <button onClick={onClose} className="p-1 rounded hover:bg-surface-elevated">
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <Input
              label="Title"
              placeholder="Optional"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setAutoSuggested(false);
              }}
            />

            {/* File Upload */}
            <label className="border border-dashed border-border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer text-text-secondary">
              <CloudUpload />
              {file ? (
                <div className="flex items-center gap-2 text-sm">
                  <span className="truncate max-w-[200px]">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <span>Choose a file</span>
              )}

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.gif"
                hidden
                onChange={(e) => {
                  setFile(e.target.files?.[0] || null);
                  setInputUrl("");
                }}
              />
            </label>

            <div className="text-center text-xs text-text-muted">OR</div>

            {/* URL */}
            <Input
              label="Content URL"
              type="url"
              placeholder="https://..."
              disabled={!!file}
              value={inputUrl}
              onChange={(e) => {
                const value = e.target.value;
                setInputUrl(value);

                if (!title && !autoSuggested && value.startsWith("http")) {
                  const s = getSuggestionsFromUrl(value);
                  if (s?.title) {
                    setTitle(s.title);
                    setAutoSuggested(true);
                  }
                }
              }}
            />

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-border rounded text-text-secondary"
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
