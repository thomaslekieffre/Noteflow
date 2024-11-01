import useSWR from "swr";

export function useNote(noteId: string | undefined) {
  const fetcher = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erreur lors du chargement de la note");
    }
    return response.json();
  };

  const { data, error, isLoading } = useSWR(
    noteId ? `/api/notes/${noteId}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
  };
}
