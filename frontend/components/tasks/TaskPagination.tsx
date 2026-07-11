"use client";

type Props = {
  page: number;

  totalPages: number;

  hasNextPage: boolean;

  hasPrevPage: boolean;

  onPageChange: (
    page: number
  ) => void;
};

export default function TaskPagination({
  page,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onPageChange,
}: Props) {

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-10">

      <button
        disabled={!hasPrevPage}
        onClick={() =>
          onPageChange(page - 1)
        }
        className="px-5 py-2 rounded-xl bg-zinc-800 text-white disabled:opacity-40 hover:bg-zinc-700 transition"
      >
        Previous
      </button>

      <div className="text-zinc-300">

        Page{" "}

        <span className="font-semibold text-white">
          {page}
        </span>

        {" "}of{" "}

        <span className="font-semibold text-white">
          {totalPages}
        </span>

      </div>

      <button
        disabled={!hasNextPage}
        onClick={() =>
          onPageChange(page + 1)
        }
        className="px-5 py-2 rounded-xl bg-zinc-800 text-white disabled:opacity-40 hover:bg-zinc-700 transition"
      >
        Next
      </button>

    </div>
  );
}