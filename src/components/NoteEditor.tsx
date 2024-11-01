import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlock from "@tiptap/extension-code-block";
import Placeholder from "@tiptap/extension-placeholder";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import { common, createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import {
  FiBold,
  FiItalic,
  FiCode,
  FiList,
  FiHash,
  FiUnderline,
} from "react-icons/fi";
import { FaQuoteLeft, FaStrikethrough } from "react-icons/fa";
import { Editor } from "@tiptap/core";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { HocuspocusProvider } from "@hocuspocus/provider";
import { MenuBar } from "./EditorMenuBar";
import * as Y from "yjs";

const lowlight = createLowlight(common);

import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import css from "highlight.js/lib/languages/css";
import html from "highlight.js/lib/languages/xml";

lowlight.register("javascript", javascript);
lowlight.register("typescript", typescript);
lowlight.register("python", python);
lowlight.register("css", css);
lowlight.register("html", html);

interface NoteEditorProps {
  content: string;
  onChange: (content: string) => void;
  noteId: string;
  user: {
    id: string;
    fullName: string;
  };
}

const NoteEditor: React.FC<NoteEditorProps> = ({
  content,
  onChange,
  noteId,
  user,
}) => {
  const ydoc = new Y.Doc();

  const provider = new HocuspocusProvider({
    document: ydoc,
    url: process.env.NEXT_PUBLIC_HOCUSPOCUS_URL || "ws://localhost:1234",
    name: noteId,
    token: JSON.stringify({
      userId: user?.id,
      userName: user?.fullName,
      userColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
    }),
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Placeholder.configure({
        placeholder: "Commencez à écrire...",
      }),
      Strike,
      Underline,
      Collaboration.configure({
        document: provider.document,
        field: "content",
      }),
      CollaborationCursor.configure({
        provider,
        user: {
          name: user?.fullName || "Anonymous",
          color: "#" + Math.floor(Math.random() * 16777215).toString(16),
        },
      }),
    ],
    content: content,
    onCreate: ({ editor }) => {
      editor.commands.setContent(content);
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  useEffect(() => {
    provider.on("status", ({ status }: { status: string }) => {
      if (status === "connected") {
        console.log("Connecté au serveur de collaboration");
      } else if (status === "disconnected") {
        console.error("Déconnecté du serveur de collaboration");
      }
    });

    return () => {
      provider.destroy();
    };
  }, [provider]);

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <MenuBar editor={editor} />
      <div className="min-h-[500px] w-full rounded-lg bg-transparent dark:bg-gray-900 p-4">
        <EditorContent
          editor={editor}
          className="prose dark:prose-invert max-w-none focus:outline-none min-h-[480px] [&>div]:outline-none"
        />
      </div>
    </div>
  );
};

export default NoteEditor;
