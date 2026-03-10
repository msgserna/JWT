import { NextRequest, NextResponse } from "next/server";
import { signToken, VALID_USER } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son obligatorios" },
        { status: 400 }
      );
    }

    if (email !== VALID_USER.email || password !== VALID_USER.password) {
      return NextResponse.json(
        { error: "Credenciales incorrectas" },
        { status: 401 }
      );
    }

    const token = await signToken({
      email: VALID_USER.email,
      name: VALID_USER.name,
    });

    return NextResponse.json({ token, user: { email: VALID_USER.email, name: VALID_USER.name } });
  } catch {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
