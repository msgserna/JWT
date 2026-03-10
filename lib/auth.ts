import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "super_secret_key_para_jwt_actividad_daw2_2024"
);

export interface UserPayload {
  email: string;
  name: string;
}

export async function signToken(payload: UserPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(SECRET);
}

export async function verifyToken(token: string): Promise<UserPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return {
      email: payload.email as string,
      name: payload.name as string,
    };
  } catch {
    return null;
  }
}

export const VALID_USER = {
  email: "admin@tomates.com",
  password: "1234",
  name: "Admin Tomates",
};
