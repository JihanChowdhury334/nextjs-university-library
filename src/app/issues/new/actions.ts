"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { db } from "@/db";
import { users, issues } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createIssue(formData: FormData) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    redirect("/signin");
  }

  const currentUser = await db
    .select()
    .from(users)
    .where(eq(users.email, session.user.email))
    .limit(1);

  if (currentUser.length === 0) {
    redirect("/signin");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const status = formData.get("status") as string;

  if (!title || !description) {
    throw new Error("Title and description are required");
  }

  await db.insert(issues).values({
    title,
    description,
    status: status || "open",
    userId: currentUser[0].id,
  });

  redirect("/issues");
}