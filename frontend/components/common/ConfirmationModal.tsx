"use client";

type Props = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
  loading = false,
  onConfirm,
  onCancel,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">

      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

        <h2 className="text-2xl font-bold text-white">
          {title}
        </h2>

        <p className="mt-3 text-zinc-400 leading-relaxed">
          {message}
        </p>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-xl border border-zinc-700 px-5 py-2.5 text-zinc-300 transition hover:bg-zinc-800 disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`rounded-xl px-5 py-2.5 font-medium text-white transition disabled:opacity-50 ${
              danger
                ? "bg-red-600 hover:bg-red-700"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {loading ? "Please wait..." : confirmText}
          </button>

        </div>

      </div>

    </div>
  );
}