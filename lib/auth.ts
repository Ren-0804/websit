import { SignJWT, jwtVerify, type JWTPayload } from "jose"

const JWT_ISSUER = "fengji-cms"
const JWT_AUDIENCE = "fengji-admin"

function getJwtKey() {
  const secret = process.env.JWT_SECRET
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be configured with at least 32 characters")
  }
  return new TextEncoder().encode(secret)
}

export type AdminTokenPayload = JWTPayload & { admin: true }

export async function signToken() {
  return new SignJWT({ admin: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setExpirationTime("8h")
    .sign(getJwtKey())
}

export async function verifyToken(token: string): Promise<AdminTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtKey(), {
      algorithms: ["HS256"],
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    })
    return payload.admin === true ? (payload as AdminTokenPayload) : null
  } catch {
    return null
  }
}
