import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createCollaboration } from "@/lib/db";

export async function POST(request: NextRequest, context: any) {
  const { id } = (await context.params);
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const code = await createCollaboration(userId, id);
    return NextResponse.json({ code });
  } catch (error) {
    console.error(
      "Erreur lors de la création du code de collaboration:",
      error
    );
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
