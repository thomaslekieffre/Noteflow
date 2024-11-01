import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { joinCollaboration } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    const { code } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const result = await joinCollaboration(userId, code);

    if (!result) {
      return NextResponse.json(
        { error: "Code invalide ou expiré" },
        { status: 400 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erreur lors de la jointure à la collaboration:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
