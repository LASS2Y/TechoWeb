"use server";

import crypto from "crypto";
import { usersTable } from "@/db/schema";
import { compare, hash } from "bcryptjs";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SECRET = process.env.SECRET;
if (!SECRET) throw new Error("SECRET manquant");

function sign(login: string) {
  return crypto
    .createHmac("sha256", SECRET as string)
    .update(login)
    .digest("hex");
}

export async function register(form: FormData) {
  const login = String(form.get("login"));
  const password = String(form.get("password"));

  const existing = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.login, login));

  if (existing.length > 0) {
    throw new Error("Utilisateur déjà existant");
  }

  await db.insert(usersTable).values({
    login,
    password: await hash(password, 10),
  });
}

export async function login(form: FormData) {
  const login = String(form.get("login"));
  const password = String(form.get("password"));

  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.login, login));

  if (users.length === 0) {
    throw new Error("Identifiants incorrects");
  }

  const valid = await compare(password, users[0].password);
  if (!valid) {
    throw new Error("Identifiants incorrects");
  }

  const cookieStore = await cookies();
  cookieStore.set("session", `${login};${sign(login)}`, {
    httpOnly: true,
    secure: false, // true uniquement en HTTPS réel
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/welcome");
}

export async function getCurrentUser() {
  const session = (await cookies()).get("session");
  if (!session) return null;

  const [login, signature] = session.value.split(";");
  if (!login || !signature) return null;

  if (sign(login) !== signature) return null;

  // Vérifie que l’utilisateur existe encore
  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.login, login));

  return users.length > 0 ? login : null;
}
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");

  redirect("/auth");
}
