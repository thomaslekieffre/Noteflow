import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getNote, updateNote } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const note = await getNote(userId, params.id);

    if (!note) {
      return NextResponse.json({ error: "Note non trouvée" }, { status: 404 });
    }

    return NextResponse.json(note);
  } catch (error) {
    console.error("Erreur lors de la récupération de la note:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { title, content } = await request.json();
    const updatedNote = await updateNote(
      userId,
      params.id,
      title || "",
      content || ""
    );

    if (!updatedNote) {
      return NextResponse.json({ error: "Note non trouvée" }, { status: 404 });
    }

    return NextResponse.json(updatedNote);
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
