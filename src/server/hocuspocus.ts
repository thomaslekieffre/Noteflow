import { Hocuspocus } from "@hocuspocus/server";
import { Database } from "@hocuspocus/extension-database";
import { Logger } from "@hocuspocus/extension-logger";
import { sql } from "@vercel/postgres";
import * as dotenv from "dotenv";
import * as Y from "yjs";

dotenv.config({ path: ".env.local" });

if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL is not defined in environment variables");
}

const server = new Hocuspocus({
  port: 1234,
  extensions: [
    new Logger(),
    new Database({
      fetch: async ({ documentName }) => {
        try {
          const result = await sql`
            SELECT content FROM notes 
            WHERE id = ${documentName}
          `;

          if (!result.rows[0]?.content) {
            const yDoc = new Y.Doc();
            yDoc.getXmlFragment("prosemirror");
            const state = Y.encodeStateAsUpdate(yDoc);
            const content = Buffer.from(state).toString("base64");

            await sql`
              UPDATE notes 
              SET content = ${content}
              WHERE id = ${documentName}
            `;

            return state;
          }

          const content = result.rows[0].content;
          return Buffer.from(content, "base64");
        } catch (error) {
          console.error("Erreur lors de la récupération du document:", error);
          const yDoc = new Y.Doc();
          yDoc.getXmlFragment("prosemirror");
          return Y.encodeStateAsUpdate(yDoc);
        }
      },
      store: async ({ documentName, document }) => {
        if (!document) return;
        try {
          const update = Y.encodeStateAsUpdate(document);
          const content = Buffer.from(update).toString("base64");

          await sql`
            UPDATE notes 
            SET content = ${content}
            WHERE id = ${documentName}
          `;
        } catch (error) {
          console.error("Erreur lors de la sauvegarde du document:", error);
        }
      },
    }),
  ],

  async onAuthenticate(data: { token: string | object }) {
    const token =
      typeof data.token === "string" ? JSON.parse(data.token) : data.token;

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

export default server;
