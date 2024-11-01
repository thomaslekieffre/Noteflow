import useSWR from "swr";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération de la note");
  }
  return response.json();
};

export function useNote(noteId: string | undefined) {
  const { data, error, isLoading } = useSWR(
    noteId ? `/api/notes/${noteId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  return {
    data,
    error,
    isLoading,
  };
}
