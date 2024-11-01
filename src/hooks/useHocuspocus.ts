import { useCallback, useEffect, useRef } from "react";
import { HocuspocusProvider } from "@hocuspocus/provider";
import { useUser } from "@clerk/nextjs";

export function useHocuspocus(documentId: string) {
  const providerRef = useRef<HocuspocusProvider | null>(null);
  const { user } = useUser();

  const getProvider = useCallback(() => {
    if (!providerRef.current) {
      providerRef.current = new HocuspocusProvider({
        url: "ws://localhost:1234",
        name: documentId,
        token: JSON.stringify({
          userId: user?.id,
          userName: user?.fullName,
          userColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
        }),
      });
    }
    return providerRef.current;
  }, [documentId, user]);

  useEffect(() => {
    const provider = getProvider();

    return () => {
      provider.destroy();
      providerRef.current = null;
    };
  }, [getProvider]);

  return getProvider();
}
