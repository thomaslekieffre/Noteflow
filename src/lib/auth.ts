import { useUser as useClerkUser } from "@clerk/nextjs";

export function useUser() {
  const { user, isLoaded } = useClerkUser();

  return {
    data: user,
    error: null,
    isLoading: !isLoaded,
  };
}
