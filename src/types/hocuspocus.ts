import type { HocuspocusProvider } from "@hocuspocus/provider";

export interface TokenData {
  userId: string;
  userName: string | null;
  userColor: string;
}

export interface DatabaseConfig {
  documentName: string;
  document?: string;
}

export interface HocuspocusAuthPayload {
  data: {
    token: TokenData;
    provider: HocuspocusProvider;
  };
}

export interface HocuspocusUser {
  id: string;
  name: string;
  color: string;
}
