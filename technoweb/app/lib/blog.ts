"use server";

import { db } from "@/db";
import { postsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getPosts() {
  return await db.select().from(postsTable);
}

export async function getPost(id: number) {
  const result = await db
    .select()
    .from(postsTable)
    .where(eq(postsTable.id, id))
    .limit(1);

  return result[0];
}

export async function createPost(form: FormData) {
  const title = form.get("title")?.toString() || "";
  const content = form.get("content")?.toString() || "";

  const creator = "Me";

  await db.insert(postsTable).values({
    title,
    content,
    creator,
  });

  revalidatePath("/blog");
  redirect("/blog");
}

export async function editPost(form: FormData) {
  const id = Number(form.get("id"));
  const title = form.get("title")?.toString() || "";

  if (id) {
    await db
      .update(postsTable)
      .set({
        title: title,
      })
      .where(eq(postsTable.id, id));
  }

  revalidatePath("/blog");
  redirect("/blog");
}

export async function deletePost(id: number) {
  if (id) {
    await db.delete(postsTable).where(eq(postsTable.id, id));
  }
  revalidatePath("/blog");
}
