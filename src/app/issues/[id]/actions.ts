"use server";

import { db } from "@/db";
import { comments, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createComment(formData: FormData) {
  const session = await getServerSession();
  
  if (!session?.user?.email) {
    redirect("/signin");
  }

  const issueId = parseInt(formData.get("issueId") as string);
  const content = formData.get("content") as string;

  if (!content.trim()) {
    throw new Error("Comment content is required");
  }

  // Get user ID from session email
  const userResult = await db
    .select()
    .from(users)
    .where(eq(users.email, session.user.email))
    .limit(1);

  if (!userResult[0]) {
    throw new Error("User not found");
  }

  // Insert the comment
  await db.insert(comments).values({
    content: content.trim(),
    issueId,
    userId: userResult[0].id,
  });

  // Revalidate the issue page to show the new comment
  revalidatePath(`/issues/${issueId}`);
}