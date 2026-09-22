import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "colourplus_admin_token";

function getSecret() {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET is missing.");
  }

  return new TextEncoder().encode(secret);
}

export async function createAdminToken(email: string) {
  return new SignJWT({
    email,
    role: "admin",
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getSecret());
}

export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(
      token,
      getSecret()
    );

    if (payload.role !== "admin") {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export { COOKIE_NAME };