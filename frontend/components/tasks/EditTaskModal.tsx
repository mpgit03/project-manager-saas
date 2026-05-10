"use client";

import { useState } from "react";

type Task = {
  _id: string;

  title: string;

  description: string;

  attachment?: string;
};

type Props = {
  task: Task;

  onClose: () => void;

  onUpdate: (
    taskId: string,
    formData: FormData
  ) => Promise<void>;
};

export default function EditTaskModal({
  task,
  onClose,
  onUpdate,
}: Props) {
  const [title, setTitle] =
    useState(task.title);

  const [description, setDescription] =
    useState(task.description);

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "title",
        title
      );

      formData.append(
        "description",
        description
      );

      if (file) {
        formData.append(
          "file",
          file
        );
      }

      await onUpdate(
        task._id,
        formData
      );

      onClose();
    } catch (error) {
      console.log(error);
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
              Edit Task
            </h2>

            <p className="text-zinc-400 mt-2">
              Update task details.
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
          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl outline-none"
            required
          />

          <textarea
            rows={5}
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl outline-none resize-none"
          />

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-3">
              Replace Attachment
            </label>

            <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-zinc-700 rounded-2xl cursor-pointer hover:border-purple-500 hover:bg-zinc-800/40 transition-all">
              
              <div className="text-center">
                
                <div className="text-3xl mb-3">
                  📎
                </div>

                <p className="text-zinc-300 font-medium">
                  {file
                    ? file.name
                    : "Click to upload new attachment"}
                </p>

                <p className="text-zinc-500 text-sm mt-1">
                  PNG, JPG, PDF
                </p>
              </div>

              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  setFile(
                    e.target.files?.[0] ||
                      null
                  )
                }
              />
            </label>
          </div>

          <div className="flex justify-end gap-3">
            
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl border border-zinc-700 text-zinc-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white"
            >
              {loading
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}