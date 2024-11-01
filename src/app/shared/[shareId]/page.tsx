"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";

export default function SharedNotePage() {
  const params = useParams();
  const [note, setNote] = useState({ title: "", content: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedNote = async () => {
      if (!params?.shareId) return; // Vérification si params et shareId sont définis
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/shared/${params.shareId}`);
        if (!response.ok) {
          throw new Error("Note non trouvée ou lien expiré");
        }
        const data = await response.json();
        setNote(data);
      } catch (error) {
        console.error("Erreur:", error);
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSharedNote();
  }, [params?.shareId]); // Ajout de params? dans les dépendances

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Erreur :</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 max-w-4xl"
    >
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: note.content }}
      />
    </motion.div>
  );
}
