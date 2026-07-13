"use client";

import { useState } from "react";


type Props = {
  onClose: () => void;
  onCreate: (data: {
    name: string;
    description: string;
  }) => Promise<void>;
};

export default function CreateProjectModal({
  onClose,
  onCreate,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  try {
    setLoading(true);

    await onCreate(formData);

    onClose();
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Create Project
            </h2>

            <p className="text-zinc-400 mt-2">
              Add a new project to your workspace.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Project Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter project name"
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 focus:border-purple-500 transition-all text-white px-4 py-3 rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Description
            </label>

            <textarea
              name="description"
              rows={5}
              placeholder="Describe your project..."
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 focus:border-purple-500 transition-all text-white px-4 py-3 rounded-xl outline-none resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-4 pt-4">
            
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:opacity-90 transition-all"
            >
              {loading
                ? "Creating..."
                : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}