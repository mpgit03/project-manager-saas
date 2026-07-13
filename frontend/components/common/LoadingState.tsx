type Props = {
  message?: string;
};

export default function LoadingState({
  message = "Loading...",
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20">

      <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-purple-500" />

      <p className="mt-6 text-zinc-400">
        {message}
      </p>

    </div>
  );
}