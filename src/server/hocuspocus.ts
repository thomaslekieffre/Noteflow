import { Server, onAuthenticatePayload } from "@hocuspocus/server";
import { Logger } from "@hocuspocus/extension-logger";
import { sql } from "@/lib/db";

// Interface pour les opérations de base de données
interface DatabaseContext {
  documentName: string;
  document?: string;
}

// Interface pour le payload d'authentification
interface AuthContext {
  data: {
    token?: {
      userId: string;
      userName?: string;
      userColor?: string;
    };
  };
}

const server = Server.configure({
  port: 1234,
  extensions: [new Logger()],

  async onAuthenticate(payload: onAuthenticatePayload) {
    const token =
      typeof payload.token === "string"
        ? JSON.parse(payload.token)
        : payload.token;
    if (!token?.userId) {
      throw new Error("Non autorisé");
    }

    return {
      user: {
        id: token.userId,
        name: token.userName || "Anonymous",
        color: token.userColor || "#000000",
      },
    };
  },
});

server.listen();
