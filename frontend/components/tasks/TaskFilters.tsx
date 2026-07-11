"use client";

type Props = {
  search: string;
  setSearch: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;
};

export default function TaskFilters({
  search,
  setSearch,
  status,
  setStatus,
  sort,
  setSort,
}: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col lg:flex-row gap-4">

      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 transition"
      />

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none"
      >
        <option value="all">
          All Status
        </option>

        <option value="todo">
          Todo
        </option>

        <option value="in_progress">
          In Progress
        </option>

        <option value="done">
          Done
        </option>
      </select>

      <select
        value={sort}
        onChange={(e) =>
          setSort(e.target.value)
        }
        className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none"
      >
        <option value="-createdAt">
          Newest First
        </option>

        <option value="createdAt">
          Oldest First
        </option>

        <option value="title">
          Title A-Z
        </option>

        <option value="-title">
          Title Z-A
        </option>

        <option value="status">
          Status
        </option>
      </select>

    </div>
  );
}