import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createShareLink, getSharedNote } from "@/lib/db";

export async function GET(request: NextRequest, context: any) {
  const { shareId } = (await context.params);
  try {
    const note = await getSharedNote(shareId);

    if (!note) {
      return NextResponse.json({ error: "Note non trouvée" }, { status: 404 });
    }

    return NextResponse.json(note);
  } catch (error) {
    console.error("Erreur lors de la récupération de la note partagée:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, context: any) {
  try {
    const { userId } = await auth();
    const { id } = (await context.params);

    if (!userId) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const shareId = await createShareLink(userId, id);
    return NextResponse.json({ shareId });
  } catch (error) {
    console.error("Erreur lors de la création du lien de partage:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
